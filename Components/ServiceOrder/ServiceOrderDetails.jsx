import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import api from "../../services/api";

export default function ServiceOrderDetails({
  serviceOrderId,
  onCancel,
  onEdit,
}) {
  const [serviceOrder, setServiceOrder] = useState({});

  useEffect(() => {
    console.log("AA", serviceOrderId);
    api.get(`service-orders/${serviceOrderId}?populate=*`).then((r) => {
      console.log(r.data.data);
      setServiceOrder(r.data.data);
    });
  }, [serviceOrderId]);
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Dados da Ordem de Serviço
      </Heading>

      {!!serviceOrder.id && (
        <>
          <Box marginBottom={"15px"}>
            <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
              Nome Cliente
            </Heading>
            <Input
              value={serviceOrder.attributes.client.data.attributes.name}
              disabled
              maxW="700px"
              placeholder="Nome do ServiceOrdere"
            />
          </Box>

          <Box marginBottom={"15px"}>
            <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
              CPF Cliente
            </Heading>
            <Input
              value={serviceOrder.attributes.client.data.attributes.cpf}
              disabled
              maxW="700px"
              placeholder="Nome do ServiceOrdere"
            />
          </Box>

          <Box marginBottom={"15px"}>
            <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
              Email Cliente
            </Heading>
            <Input
              value={serviceOrder.attributes.client.data.attributes.email}
              disabled
              maxW="700px"
              placeholder="Nome do ServiceOrdere"
            />
          </Box>

          <Box marginBottom={"15px"}>
            <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
              Modelo de Celular
            </Heading>
            <Input
              value={serviceOrder.attributes.phone.data.attributes.model}
              disabled
              maxW="700px"
              placeholder="Nome do ServiceOrdere"
            />
          </Box>

          <Box marginBottom={"15px"}>
            <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
              Serviços
            </Heading>
            {serviceOrder.attributes.services.data.map((item, i) => {
              return (
                <Input
                  key={i}
                  value={`${item.attributes.type}  \t\t\t\t\t  R$ ${item.attributes.price}`}
                  disabled
                  maxW="700px"
                />
              );
            })}
          </Box>
        </>
      )}

      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={() => onEdit(serviceOrderId)} colorScheme={"whatsapp"}>
          Editar
        </Button>
      </Flex>
    </>
  );
}
