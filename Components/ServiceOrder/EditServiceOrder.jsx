import {
  Flex,
  Heading,
  Button,
  Box,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import api from "../../services/api";

export default function EditServiceOrder({
  serviceOrderId,
  onUpdate,
  onCancel,
}) {
  const [serviceOrder, setServiceOrder] = useState({});
  const [option, setOption] = useState(0);

  const [flagFetch, setFlagFetch] = useState(false);

  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);

  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState([]);

  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    api.get(`service-orders/${serviceOrderId}?populate=*`).then((r) => {
      var orderService = r.data.data;

      api.get("services").then((r) => {
        const allServicesData = r.data.data;

        const selectedServices = [];

        const filteredServices = allServicesData.filter((item) => {
          for (var x in orderService.attributes.services.data) {
            if (orderService.attributes.services.data[x].id == item.id) {
              selectedServices.push(item);
              return false;
            }
          }
          return true;
        });

        setClient(orderService.attributes.client.data.id);
        setPhone(orderService.attributes.phone.data.id);
        setServiceOrder(orderService);
        console.log(serviceOrder);
        setServices(selectedServices);
        setAllServices(filteredServices);
      });
    });

    api.get("clients").then((r) => {
      setClients(r.data.data);
    });

    api.get("phones").then((r) => {
      setPhones(r.data.data);
    });
  }, [serviceOrderId]);

  function handleEdit() {
    const data = {
      client: {
        id: client,
      },
      phone: {
        id: phone,
      },
      services: services.map((item) => ({ id: item.id })),
    };

    toast
      .promise(
        api.put(`service-orders/${serviceOrderId}`, {
          data,
        }),
        {
          success: "ServiceOrdere Atualizado com sucesso",
          error: "Erro ao Atualizar ServiceOrdere",
        }
      )
      .then((e) => {
        onUpdate();
      });
  }

  function handleSelectService(id) {
    const v = allServices.filter((item) => {
      if (item.id == id) {
        services.push(item);
        return false;
      }
      return true;
    });
    setAllServices(v);
    setOption((v) => v + 1);
  }

  function handleDeleteService(id) {
    const v = services.filter((item) => {
      if (item.id == id) {
        allServices.push(item);
        return false;
      }
      return true;
    });
    setServices(v);
    setOption((v) => v + 1);
  }

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Edição de ServiceOrdere
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Cliente
        </Heading>
        <Select
          onChange={(e) => {
            setClient(e.target.options[e.target.selectedIndex].value);
          }}
        >
          {clients.map((item, i) => {
            return (
              <option
                key={i}
                value={item.id}
                selected={
                  !!serviceOrder.attributes &&
                  item.id === serviceOrder.attributes.client.data.id
                }
              >
                {item.attributes.name}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo de celular
        </Heading>
        <Select
          onChange={(e) => {
            setPhone(e.target.options[e.target.selectedIndex].value);
          }}
        >
          {phones.map((item, i) => {
            return (
              <option
                key={i}
                value={item.id}
                selected={
                  serviceOrder.attributes &&
                  item.id === serviceOrder.attributes.phone.data.id
                }
              >
                {item.attributes.model}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Serviços
        </Heading>

        <Flex p="0 20px 20px 20px">
          {services.map((s, index) => {
            return (
              <Flex
                key={index}
                m="5px"
                p="5px 20px"
                border="1px solid #c1c1c1"
                borderRadius={"5px"}
                alignItems="center"
                justifyContent={"space-around"}
                flexWrap="wrap"
              >
                <Text>
                  {s.attributes.type}
                  {" - R$"}
                  {s.attributes.price}
                </Text>
                <Box
                  marginX={"10px"}
                  cursor={"pointer"}
                  _hover={{ opacity: 0.5 }}
                  onClick={() => handleDeleteService(s.id)}
                >
                  <MdOutlineDelete color="#ff0000" size={20} />
                </Box>
              </Flex>
            );
          })}
        </Flex>
        <Select
          onChange={(e) => {
            handleSelectService(e.target.options[e.target.selectedIndex].value);
          }}
        >
          <option selected={option > 0} value={-1}>
            {allServices.length == 0 ? "Sem serviços" : "Adicionar serviço"}
          </option>
          {allServices.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.attributes.type}
                {" - R$"}
                {item.attributes.price}
              </option>
            );
          })}
        </Select>
      </Box>
      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={handleEdit} colorScheme={"whatsapp"}>
          Salvar
        </Button>
      </Flex>
    </>
  );
}
