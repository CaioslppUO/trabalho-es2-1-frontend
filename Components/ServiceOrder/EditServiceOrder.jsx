import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function EditServiceOrder({
  serviceOrderId,
  onUpdate,
  onCancel,
}) {
  const [serviceOrder, setServiceOrder] = useState({});

  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);

  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState([]);

  const [services, setServices] = useState("");
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    api.get(`service-orders/${serviceOrderId}?populate=*`).then((r) => {
      setServiceOrder(r.data.data);
    });

    api.get("clients").then((r) => {
      console.log(r.data.data);
    });
  }, [serviceOrderId]);

  function handleEdit() {
    const data = {
      name,
      cpf,
      email,
    };

    toast
      .promise(
        api.put(`ServiceOrders/${ServiceOrderId}`, {
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

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Edição de ServiceOrdere
      </Heading>

      {/* <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Cliente
        </Heading>
        <Select
          onChange={(e) => {
            setClient(e.target.options[e.target.selectedIndex].value);
          }}
          placeholder="Select option"
        >
          {serviceOrder.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.attributes.name}
              </option>
            );
          })}
        </Select>
      </Box> */}

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo de celular
        </Heading>
        <Select
          onChange={(e) => {
            setPhone(e.target.options[e.target.selectedIndex].value);
          }}
          placeholder="Select option"
        >
          {phones.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.attributes.name}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Serviço
        </Heading>
        <Select
          onChange={(e) => {
            setPhone(e.target.options[e.target.selectedIndex].value);
          }}
          placeholder="Select option"
        >
          {phones.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.attributes.name}
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
