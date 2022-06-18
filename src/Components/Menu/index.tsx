import { Flex, Heading } from "@chakra-ui/react";
import { MdPermDeviceInformation } from "react-icons/md";
import { useAppDispatch } from "../../store/hooks";
import { ActiveTabsProps, setActiveTab } from "../../store/reducers/app";
import MenuSection from "./MenuSection";

export default function Menu() {
  const dispatch = useAppDispatch();
  function ChangeScreen(value: ActiveTabsProps) {
    dispatch(setActiveTab(value));
  }
  return (
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
        <MenuSection
          sectionTitle="Clientes"
          registrationAction={() => ChangeScreen("ClientRegistration")}
          seeAllAction={() => ChangeScreen("ShowAllClients")}
        />
        <MenuSection
          sectionTitle="Celulares"
          registrationAction={() => ChangeScreen("PhoneRegistration")}
          seeAllAction={() => ChangeScreen("ShowAllPhones")}
        />
        <MenuSection
          sectionTitle="Serviços"
          registrationAction={() => ChangeScreen("ServiceRegistration")}
          seeAllAction={() => ChangeScreen("ShowAllServices")}
        />
        <MenuSection
          sectionTitle="Ordens de Serviços"
          registrationAction={() => ChangeScreen("orderRegistration")}
          seeAllAction={() => ChangeScreen("ShowAllOrders")}
        />
      </Flex>
    </Flex>
  );
}
