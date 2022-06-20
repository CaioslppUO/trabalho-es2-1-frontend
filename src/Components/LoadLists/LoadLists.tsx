import { Button, Flex, Heading } from "@chakra-ui/react";
import FileInput from "../inputs/FileInput";

export default function LoadLists() {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Carregar Listas em aquivos
      </Heading>

      <Flex flexDirection={"column"}>
        <FileInput
          label="Lista de Aparelhos"
          onChange={(e) => console.log(e)}
        />
        <FileInput label="Lista de serviços" onChange={(e) => console.log(e)} />
      </Flex>

      <Button colorScheme={"whatsapp"} maxWidth={"200px"}>
        Carregar Dados
      </Button>
    </>
  );
}
