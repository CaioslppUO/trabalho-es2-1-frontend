import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";

export default function CellphoneRegistry({ onRegistry }) {
  const [modelo, setModelo] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    api.get("clients?populate=*").then((r) => {
      setClients(r.data.data);
    });
  }, []);

  function handleRegistry() {
    const data = {
      model: modelo,
      client: {
        id: selectedClient,
      },
    };
    toast
      .promise(
        api.post("phones?populate=*", {
          data,
        }),
        {
          success: "Celular Cadastrado",
          error: "Erro ao cadastrar",
        }
      )
      .then((r) => {
        onRegistry();
      });
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Cadastro Celular
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo
        </Heading>
        <Input
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          maxW="700px"
          placeholder="Nome do cliente"
        />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Cliente
        </Heading>
        <Select
          onChange={(e) => {
            setSelectedClient(e.target.options[e.target.selectedIndex].value);
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

      <Flex gap="30px" marginTop="30px">
        <Button colorScheme={"blackAlpha"}>Cancelar</Button>
        <Button onClick={handleRegistry} colorScheme={"whatsapp"}>
          Finalizar
        </Button>
      </Flex>
    </>
  );
}
