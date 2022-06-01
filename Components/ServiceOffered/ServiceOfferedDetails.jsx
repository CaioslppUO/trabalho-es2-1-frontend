import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function EditServiceOffered({ serviceOfferedId, onCancel, onEdit }) {
  const [service, setService] = useState("");
  const [serviceprice, setServicePrice] = useState("");


  useEffect(() => {
    api.get(`servicesOffered/${serviceOfferedId}`).then((r) => {
      console.log(r.data);
      setService(r.data.data.attributes.service);
      setServicePrice(r.data.data.attributes.serviceprice);
      
    });
  }, [serviceOfferedId]);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Dados do Serviço
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Nome do Serviço
        </Heading>
        <Input
          value={service}
          disabled
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
          disabled
          maxW="700px"
          placeholder="Preço"
        />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={() => onEdit(serviceOfferedId)} colorScheme={"whatsapp"}>
          Editar
        </Button>
      </Flex>
    </>
  );
}
