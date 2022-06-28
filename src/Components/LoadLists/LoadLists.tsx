import { Button, Flex, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { PhonesController } from "../../controllers/PhonesController";
import { ServicesController } from "../../controllers/ServicesController";
import api from "../../services/api";
import { useAppDispatch } from "../../store/hooks";
import {
  setLoading,
  setPhones,
  setServices,
} from "../../store/reducers/appReducer";
import FileInput from "../inputs/FileInput";

export default function LoadLists() {
  const [phoneFile, setPhoneFile] = useState<File>();
  const [servicesFile, setservicesFile] = useState<File>();
  const dispacth = useAppDispatch();
  const toast = useToast();
  async function handleSend() {
    dispacth(setLoading(true));
    const formData = new FormData();
    if (phoneFile) {
      formData.append("file", phoneFile);
      const response = await api.post("phones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status !== 200) {
        toast({
          title: "Erro ao importar arquivo de celulares!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Sucesso ao importar aquivo de celulares!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    if (servicesFile) {
      formData.append("file", servicesFile);
      const response = await api.post("services", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status !== 200) {
        toast({
          title: "Erro ao importar arquivo de serviços!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Sucesso ao importar aquivo de serviços!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    const services = await new ServicesController().fetchServices();
    const phones = await new PhonesController().fetchPhones();
    dispacth(setServices(services));
    dispacth(setPhones(phones));
    dispacth(setLoading(false));
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Carregar Listas em aquivos
      </Heading>

      <Flex flexDirection={"column"}>
        <FileInput
          label="Lista de Aparelhos"
          onChange={(e) => setPhoneFile(e)}
        />
        <FileInput
          label="Lista de serviços"
          onChange={(e) => setservicesFile(e)}
        />
      </Flex>

      <Button onClick={handleSend} colorScheme={"whatsapp"} maxWidth={"200px"}>
        Carregar Dados
      </Button>
    </>
  );
}
