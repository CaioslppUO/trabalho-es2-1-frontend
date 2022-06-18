import { Flex, Heading, Button, Box, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import api from "../../services/api";
import { MdOutlineDelete } from "react-icons/md";

export default function ServiceOrderRegistry({
  onCancel,
  onRegistry,
  onRegistryClient,
}) {
  const [option, setOption] = useState(0);

  const [client, setClient] = useState(-1);
  const [clients, setClients] = useState([]);

  const [phone, setPhone] = useState(-1);
  const [phones, setPhones] = useState([]);

  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    api.get("clients").then((r) => {
      setClients(r.data.data);
    });

    api.get("phones").then((r) => {
      setPhones(r.data.data);
    });

    api.get("services").then((r) => {
      setAllServices(r.data.data);
    });
  }, []);

  function handleRegistry() {
    if (client == -1 || phone == -1 || services.length == 0) {
      toast.error("Preencha todos os campos!");
      return;
    }
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
        api.post("service-orders?populate=*", {
          data,
        }),
        {
          success: "Ordem de serviço Cadastrada",
          error: "Erro ao cadastrar",
        }
      )
      .then((r) => {
        onRegistry();
      })
      .catch((e) => {
        alert(e.message);
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
        Cadastro Ordem de Serviço
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Cliente
        </Heading>
        <Select
          onChange={(e) => {
            if (e.target.options[e.target.selectedIndex].value == "novo") {
              onRegistryClient();
            }
            setClient(e.target.options[e.target.selectedIndex].value);
          }}
        >
          {clients.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.attributes.name}
              </option>
            );
          })}

          <option value={"novo"}>Cadastrar novo</option>
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
          placeholder="Selecionar modelo de celular"
        >
          {phones.map((item, i) => {
            return (
              <option key={i} value={item.id}>
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
            Selecione Uma Opção
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
        <Button onClick={handleRegistry} colorScheme={"whatsapp"}>
          Finalizar
        </Button>
      </Flex>
    </>
  );
}
