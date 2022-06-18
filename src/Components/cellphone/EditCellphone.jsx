import { Flex, Heading, Button, Box, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
export default function EditCellphone({ cellphoneId, onCancel, onEdit }) {
  const [modelo, setModelo] = useState("");

  useEffect(() => {
    api.get(`phones/${cellphoneId}?populate=*`).then((r) => {
      console.log(r.data);
      setModelo(r.data.data.attributes.model);
    });
  }, [cellphoneId]);

  function handleChange() {
    const data = {
      model: modelo,
    };
    toast
      .promise(
        api.put(`phones/${cellphoneId}`, {
          data,
        }),
        {
          success: "Alteração realizadas com sucesso",
          error: "Erro ao atualizar",
        }
      )
      .then((r) => {
        onEdit();
      });
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Edição do Celular
      </Heading>

      <Box marginBottom={"15px"}>
        <Heading marginBottom={"10px"} color={"#6D676E"} size={"sm"}>
          Modelo Celular
        </Heading>
        <Input
          onChange={(e) => setModelo(e.target.value)}
          value={modelo}
          maxW="700px"
          placeholder="Modelo Celular"
        />
      </Box>

      <Flex gap="30px" marginTop="30px">
        <Button onClick={onCancel} colorScheme={"blackAlpha"}>
          Cancelar
        </Button>
        <Button onClick={handleChange} colorScheme={"whatsapp"}>
          Salvar
        </Button>
      </Flex>
    </>
  );
}
