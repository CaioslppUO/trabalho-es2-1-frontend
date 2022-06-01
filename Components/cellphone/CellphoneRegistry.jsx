import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { toast } from "react-hot-toast";

export default function CellphoneRegistry({ onRegistry }) {
  const [modelo, setModelo] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  function handleRegistry() {
    const data = {
      model: modelo,
    };
    toast
      .promise(
        api.post("phones", {
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
          placeholder="Modelo do celular"
        />
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
