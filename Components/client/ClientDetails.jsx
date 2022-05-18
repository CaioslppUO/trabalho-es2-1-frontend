import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function EditClient({ clientId, onCancel, onEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    api.get(`clients/${clientId}`).then((r) => {
      console.log(r.data);
      setName(r.data.data.attributes.name);
      setCpf(r.data.data.attributes.cpf);
      setEmail(r.data.data.attributes.email);
    });
  }, [clientId]);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Dados do Cliente
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Nome
        </Heading>
        <Input
          value={name}
          disabled
          maxW="700px"
          placeholder="Nome do cliente"
        />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Email
        </Heading>
        <Input
          value={email}
          disabled
          maxW="700px"
          placeholder="Email do cliente"
        />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          CPF
        </Heading>
        <Input
          value={cpf}
          disabled
          maxW="700px"
          maxLength={11}
          minLength={11}
          placeholder="Email do cliente"
        />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={() => onEdit(clientId)} colorScheme={"whatsapp"}>
          Editar
        </Button>
      </Flex>
    </>
  );
}
