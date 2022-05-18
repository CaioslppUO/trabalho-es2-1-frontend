import { Flex, Heading, Button, Box, Input } from "@chakra-ui/react";
import { MdPermDeviceInformation } from "react-icons/md";

import { useState } from "react";
import ClientRegistry from "../Components/client/ClientRegistry";
import ShowClients from "../Components/client/ShowClients";
import ClientDetails from "../Components/client/ClientDetails";
import EditClient from "../Components/client/EditClient";

import CellphonesRegistry from "../Components/cellphone/CellphoneRegistry";
import ShowCellphones from "../Components/cellphone/ShowCellphone";
import CellphonesDetails from "../Components/cellphone/CellphoneDetails";
import EditCellphones from "../Components/cellphone/EditCellphone";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Flex w={"100vw"}>
      <Flex
        flexDirection={"column"}
        h="100vh"
        w="30vw"
        borderRight={"1px solid #00000039"}
      >
        <Flex
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          height="20%"
          // border={"1px solid red"}
          w="100%"
        >
          <MdPermDeviceInformation size={40} color="#6D676E" />
          <Heading marginTop={"10px"} size="sm" color="#6D676E">
            Sistema de Ordem de Serviços
          </Heading>
        </Flex>
        <Flex flexDirection={"column"} w="100%">
          <Heading
            color={"#6d676ea9"}
            margin={"10px"}
            size="md"
            fontWeight={"bold"}
          >
            Clientes
          </Heading>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(0)}
          >
            Cadastrar Novo
          </Button>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(1)}
          >
            Ver Todos
          </Button>

          <Heading
            color={"#6d676ea9"}
            margin={"10px"}
            size="md"
            fontWeight={"bold"}
            marginTop="20px"
          >
            Celulares
          </Heading>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(4)}
          >
            Cadastrar Novo
          </Button>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(5)}
          >
            Ver Todos
          </Button>
        </Flex>
      </Flex>
      <Flex padding={"15px"} flexDirection={"column"} w="100%">
        {activeTab === 0 && <ClientRegistry />}
        {activeTab === 1 && <ShowClients />}
        {activeTab === 2 && <ClientDetails />}
        {activeTab === 3 && <EditClient />}

        {activeTab === 4 && <CellphonesRegistry />}
        {activeTab === 5 && <ShowCellphones />}
        {activeTab === 6 && <CellphonesDetails />}
        {activeTab === 7 && <EditCellphones />}
      </Flex>
    </Flex>
  );
}
