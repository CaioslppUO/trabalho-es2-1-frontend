import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import api from "../../services/api";
import { useState, useEffect } from "react";

export default function EditCellphone({ onEdit, onCancel, cellphoneId }) {
  const [modelo, setModelo] = useState("");

  useEffect(() => {
    api.get(`phones/${cellphoneId}?populate=*`).then((r) => {
      console.log(r.data);
      setModelo(r.data.data.attributes.model);
      setSelectedClient(r.data.data.attributes.client.data.attributes.name);
    });
  }, [cellphoneId]);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Dados do Celular
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo Celular
        </Heading>
        <Input
          value={modelo}
          disabled
          maxW="700px"
          placeholder="Modelo Celular"
        />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={() => onEdit(cellphoneId)} colorScheme={"whatsapp"}>
          Editar
        </Button>
      </Flex>
    </>
  );
}
