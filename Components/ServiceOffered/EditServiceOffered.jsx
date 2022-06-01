import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function EditServiceOffered({ serviceOfferedId, onUpdate, onCancel }) {
  const [service, setService] = useState("");
  const [serviceprice, setServicePrice] = useState("");

  useEffect(() => {
    api.get(`servicesOffered/${serviceOfferedId}`).then((r) => {
      console.log(r.data);
      setService(r.data.data.attributes.service);
      setServicePrice(r.data.data.attributes.serviceprice);
    });
  }, [serviceOfferedId]);

  function handleEdit() {
    const data = {
      service,
      serviceprice,
    };

    toast
      .promise(
        api.put(`servicesOffered/${serviceOfferedId}`, {
          data,
        }),
        {
          success: "ServiceOffered Atualizado com sucesso",
          error: "Erro ao Atualizar ServiceOffered",
        }
      )
      .then((e) => {
        onUpdate();
      });
  }

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Edição do Serviço
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
          onChange={(e) => setServicePrice(e.target.value)}
          maxW="700px"
          placeholder="Preço"
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
