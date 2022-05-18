import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";

export default function CellphoneRegistry() {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Cadastro Celular
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo
        </Heading>
        <Input maxW="700px" placeholder="Nome do cliente" />
      </Box>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Cliente
        </Heading>
        <Select placeholder="Select option">
          <option value="option1">Cliente 1</option>
          <option value="option2">Cliente 2</option>
          <option value="option3">Cliente 3</option>
        </Select>
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button colorScheme={"blackAlpha"}>Cancelar</Button>
        <Button colorScheme={"whatsapp"}>Finalizar</Button>
      </Flex>
    </>
  );
}
