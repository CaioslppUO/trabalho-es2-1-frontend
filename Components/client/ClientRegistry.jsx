import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";

export default function ClientRegistry() {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Cadastro Cliente
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Nome
        </Heading>
        <Input maxW="700px" placeholder="Nome do cliente" />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Email
        </Heading>
        <Input type={"email"} maxW="700px" placeholder="Email do cliente" />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          CPF
        </Heading>
        <Input
          maxW="700px"
          maxLength={11}
          minLength={11}
          placeholder="Email do cliente"
        />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button colorScheme={"blackAlpha"}>Cancelar</Button>
        <Button colorScheme={"whatsapp"}>Finalizar</Button>
      </Flex>
    </>
  );
}
