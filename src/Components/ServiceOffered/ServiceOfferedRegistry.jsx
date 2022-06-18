import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ServiceOfferedRegistry({ onRegistry }) {

  const [service, setService] = useState("");
  const [serviceprice, setServiceprice] = useState("");
  //const [allServices, setAllServices] = useState([]);

  function handleRegistry() {
    const data = {
      service,
      serviceprice,
    };

    toast
      .promise(
        api.post("servicesOffered?populate=*", {
          data,
        }),
        {
          success: "ServiceOffered Cadastrado",
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
      Cadastro Serviço
    </Heading>

    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        Nome do Serviço
      </Heading>
      <Input
        value={service}
        onChange={(e) => setService(e.target.value)}
        maxW="700px"
        placeholder="Nome do serviço"
      />
    </Box>

    <Box marginBottom={"15px"}>
      <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
        Preço
      </Heading>
      <Input
        value={serviceprice}
        onChange={(e) => setServiceprice(e.target.value)}
        maxW="700px"
        placeholder="Preço do serviço"
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