import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ServiceOrderRegistry({ onRegistry }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [client, setClient] = useState("");
  const [clients, setClients] = useState([]);

  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState([]);

  const [services, setServices] = useState("");
  const [allServices, setAllServices] = useState([]);

  function handleRegistry() {
    const data = {
      name,
      cpf,
      email,
    };

    toast
      .promise(
        api.post("ServiceOrders?populate=*", {
          data,
        }),
        {
          success: "ServiceOrdere Cadastrado",
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
            setClient(e.target.options[e.target.selectedIndex].value);
          }}
          placeholder="Select option"
        >
          {clients.map((item, i) => {
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
        <Button colorScheme={"blackAlpha"}>Cancelar</Button>
        <Button onClick={handleRegistry} colorScheme={"whatsapp"}>
          Finalizar
        </Button>
      </Flex>
    </>
  );
}
