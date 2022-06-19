import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Homepage() {
  return (
    <Flex padding={"50px"} flexDirection={"column"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"lg"}>
        Bem vindo a Sistema de Gerenciamento e Serviços
      </Heading>
      <Text>
        Sistema para organizar dados de celular, serviços oferecidos, clientes,
        ordens de serviços e dados estatísticos
      </Text>
    </Flex>
  );
}
