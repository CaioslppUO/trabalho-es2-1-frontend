import { Flex, Heading } from "@chakra-ui/react";
import { MdPermDeviceInformation } from "react-icons/md";
import { useAppDispatch } from "../../store/hooks";
import {
  ActiveTabsProps,
  setActiveTab,
  setCurrentType,
  TypeItem,
} from "../../store/reducers/appReducer";
import MenuSection from "./MenuSection";

export default function Menu() {
  const dispatch = useAppDispatch();
  function changeScreen(value: TypeItem, tab: ActiveTabsProps) {
    dispatch(setCurrentType(value));
    dispatch(setActiveTab(tab));
  }
  return (
    <Flex
      flexDirection={"column"}
      h="100vh"
      w="30vw"
      borderRight={"1px solid #00000039"}
      overflowY={"scroll"}
      padding="30px 0px"
    >
      <Flex
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        height="10%"
        w="100%"
        paddingBottom={"20px"}
      >
        <MdPermDeviceInformation size={20} color="#6D676E" />
        <Heading marginTop={"2px"} size="sm" color="#6D676E">
          Gerenciamento e Serviços
        </Heading>
      </Flex>
      <Flex flexDirection={"column"} w="100%">
        <MenuSection
          sectionTitle="Home"
          homeAction={() => changeScreen("None", "Home")}
        />
        <MenuSection
          sectionTitle="Clientes"
          registrationAction={() => changeScreen("Client", "Registration")}
          seeAllAction={() => changeScreen("Client", "ListItems")}
        />
        <MenuSection
          sectionTitle="Celulares"
          registrationAction={() => changeScreen("Phone", "Registration")}
          seeAllAction={() => changeScreen("Phone", "ListItems")}
        />
        <MenuSection
          sectionTitle="Serviços"
          registrationAction={() => changeScreen("Service", "Registration")}
          seeAllAction={() => changeScreen("Service", "ListItems")}
        />
        <MenuSection
          sectionTitle="Ordens de Serviços"
          registrationAction={() => changeScreen("Order", "Registration")}
          seeAllAction={() => changeScreen("Order", "ListItems")}
        />
        <MenuSection
          sectionTitle="Carregar Listas de Informação"
          loadFilesAction={() => changeScreen("None", "LoadLists")}
        />
        <MenuSection
          sectionTitle="Dados Estatísticos"
          chartsTitle="Gráficos de Acompanhamento"
          chartsAction={() => changeScreen("None", "ServicesCharts")}
          servicesChartsTitle="Acompanhamento por período"
          servicesChartsAction={() => changeScreen("None", "Charts")}
        />
      </Flex>
    </Flex>
  );
}
