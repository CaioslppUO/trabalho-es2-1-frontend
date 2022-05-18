import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function EditClient({ clientId, onUpdate, onCancel }) {
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

  function handleEdit() {
    const data = {
      name,
      cpf,
      email,
    };

    toast
      .promise(
        api.put(`clients/${clientId}`, {
          data,
        }),
        {
          success: "Cliente Atualizado com sucesso",
          error: "Erro ao Atualizar Cliente",
        }
      )
      .then((e) => {
        onUpdate();
      });
  }

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Edição de Cliente
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Nome
        </Heading>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
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
          onChange={(e) => setCpf(e.target.value)}
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
        <Button onClick={handleEdit} colorScheme={"whatsapp"}>
          Salvar
        </Button>
      </Flex>
    </>
  );
}
