import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";

export default function EditCellphone() {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Dados do Celular
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo Celular
        </Heading>
        <Input disabled maxW="700px" placeholder="Modelo Celular" />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Nome Cliente
        </Heading>
        <Input disabled maxW="700px" placeholder="Nome do cliente" />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button colorScheme={"blackAlpha"}>Cancelar</Button>
        <Button colorScheme={"whatsapp"}>Editar</Button>
      </Flex>
    </>
  );
}
