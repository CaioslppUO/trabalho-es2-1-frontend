import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ClientRegistry({ onRegistry }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  function handleRegistry() {
    const data = {
      name,
      cpf,
      email,
    };

    toast
      .promise(
        api.post("clients?populate=*", {
          data,
        }),
        {
          success: "Cliente Cadastrado",
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
        Cadastro Cliente
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
          placeholder="CPF do cliente"
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
