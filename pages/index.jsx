import { Flex, Heading, Button, CircularProgress } from "@chakra-ui/react";
import { MdPermDeviceInformation } from "react-icons/md";
import { Toaster } from "react-hot-toast";

import { useState } from "react";
import ClientRegistry from "../Components/client/ClientRegistry";
import ShowClients from "../Components/client/ShowClients";
import ClientDetails from "../Components/client/ClientDetails";
import EditClient from "../Components/client/EditClient";

import ServiceOfferedRegistry from "../Components/ServiceOffered/ServiceOfferedRegistry";
import ShowServiceOffered from "../Components/ServiceOffered/ShowServiceOffered";
import ServiceOfferedDetails from "../Components/ServiceOffered/ServiceOfferedDetails";
import EditServiceOffered from "../Components/ServiceOffered/EditServiceOffered";

import CellphonesRegistry from "../Components/cellphone/CellphoneRegistry";
import ShowCellphones from "../Components/cellphone/ShowCellphone";
import CellphonesDetails from "../Components/cellphone/CellphoneDetails";
import EditCellphones from "../Components/cellphone/EditCellphone";
import ServiceOrderRegistry from "../Components/ServiceOrder/ServiceOrderRegistry";
import ShowServiceOrders from "../Components/ServiceOrder/ShowServiceOrders";
import Service from "../Components/ServiceOrder/ShowServiceOrders";
import ServiceOrderDetails from "../Components/ServiceOrder/ServiceOrderDetails";
import EditServiceOrder from "../Components/ServiceOrder/EditServiceOrder";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(11);
  const [focusId, setFocusId] = useState("");

  if (loading) {
    return (
      <Flex w="100vw" h="100vh" alignItems={"center"} justifyContent="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }
  return (
    <Flex w={"100vw"}>
      <div>
        <Toaster />
      </div>
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
          height="10%"
          w="100%"
        >
          <MdPermDeviceInformation size={20} color="#6D676E" />
          <Heading marginTop={"2px"} size="sm" color="#6D676E">
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

          <Heading
            color={"#6d676ea9"}
            margin={"10px"}
            size="md"
            fontWeight={"bold"}
            marginTop="20px"
          >
            Serviços
          </Heading>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(8)}
          >
            Cadastrar Novo
          </Button>

          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(9)}
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
            Ordens de Serviços
          </Heading>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(13)}
          >
            Cadastrar Nova
          </Button>
          <Button
            display={"flex"}
            justifyContent="flex-start"
            borderRadius="none"
            background={"#d4d4d45e"}
            marginBottom="1px"
            onClick={() => setActiveTab(14)}
          >
            Ver Todas
          </Button>
        </Flex>
      </Flex>
      <Flex padding={"15px"} flexDirection={"column"} w="100%">
        {activeTab === 0 && (
          <ClientRegistry onRegistry={() => setActiveTab(-1)} />
        )}
        {activeTab === 1 && (
          <ShowClients
            onEditClient={(id) => {
              setFocusId(id);
              setActiveTab(3); //editClient
            }}
            onSelectClient={(id) => {
              setFocusId(id);
              setActiveTab(2);
            }}
          />
        )}
        {activeTab === 2 && (
          <ClientDetails
            onCancel={() => setActiveTab(-1)}
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(3);
            }}
            clientId={focusId}
          />
        )}
        {activeTab === 3 && (
          <EditClient
            onCancel={() => setActiveTab(-1)}
            clientId={focusId}
            onUpdate={() => setActiveTab(-1)}
          />
        )}

        {activeTab === 4 && (
          <CellphonesRegistry onRegistry={() => setActiveTab(-1)} />
        )}
        {activeTab === 5 && (
          <ShowCellphones
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(6);
            }}
          />
        )}
        {activeTab === 6 && (
          <CellphonesDetails
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(7);
            }}
            cellphoneId={focusId}
            onCancel={() => setActiveTab(-1)}
          />
        )}
        {activeTab === 7 && (
          <EditCellphones
            onEdit={() => setActiveTab(-1)}
            onCancel={() => setActiveTab(-1)}
            cellphoneId={focusId}
          />
        )}

        {activeTab === 8 && (
          <ServiceOfferedRegistry onRegistry={() => setActiveTab(-1)} />
        )}
        {activeTab === 9 && (
          <ShowServiceOffered
            onEditServiceOffered={(id) => {
              setFocusId(id);
              setActiveTab(11); //editClient
            }}
            onSelectServiceOffered={(id) => {
              setFocusId(id);
              setActiveTab(10);
            }}
          />
        )}
        {activeTab === 10 && (
          <ServiceOfferedDetails
            onCancel={() => setActiveTab(-1)}
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(11);
            }}
            serviceOfferedId={focusId}
          />
        )}
        {activeTab === 11 && (
          <EditServiceOffered
            onCancel={() => setActiveTab(-1)}
            serviceOfferedId={focusId}
            onUpdate={() => setActiveTab(-1)}
          />
        )}

        {activeTab === 13 && (
          <ServiceOrderRegistry
            onRegistryClient={() => {
              setActiveTab(0);
            }}
            onCancel={() => {
              setActiveTab(14);
            }}
            onRegistry={() => setActiveTab(14)}
          />
        )}
        {activeTab === 14 && (
          <ShowServiceOrders
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(16);
            }}
            onSelectServiceOrder={(id) => {
              setFocusId(id);
              setActiveTab(15);
            }}
          />
        )}
        {activeTab === 15 && (
          <ServiceOrderDetails
            onEdit={(id) => {
              setFocusId(id);
              setActiveTab(16);
            }}
            serviceOrderId={focusId}
            onCancel={() => setActiveTab(14)}
          />
        )}
        {activeTab === 16 && (
          <EditServiceOrder
            onEdit={() => setActiveTab(14)}
            onCancel={() => setActiveTab(14)}
            serviceOrderId={focusId}
            onUpdate={() => setActiveTab(14)}
          />
        )}
      </Flex>
    </Flex>
  );
}
