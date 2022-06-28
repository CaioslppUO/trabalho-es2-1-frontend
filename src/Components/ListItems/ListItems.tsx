import { Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setActiveTab,
  setCurrentItem,
  setCurrentType,
  TypeData,
  TypeItem,
} from "../../store/reducers/appReducer";

export function ListItems() {
  const dispatch = useAppDispatch();
  const { currentType, clients, orders, services, phones } = useAppSelector(
    (s) => s.app
  );

  function changeToEditTab(v: TypeItem, item: TypeData) {
    dispatch(setCurrentType(v));
    dispatch(setCurrentItem(item));
    dispatch(setActiveTab("Edit"));
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        {currentType === "Client" && "Clientes"}
        {currentType === "Phone" && "Celulares"}
        {currentType === "Order" && "Ordens de Serviços"}
        {currentType === "Service" && "Serviços"} Cadastrados
      </Heading>

      <Flex gap={"13px"} wrap="wrap">
        {currentType === "Client" &&
          clients &&
          clients.length > 0 &&
          clients.map((item, i) => {
            return (
              <Container
                key={i}
                onClick={() => changeToEditTab("Client", item)}
              >
                <Flex>ID: {item.id}</Flex>
                <Flex>NOME: {item.name}</Flex>
                <Flex>EMAIL: {item.email}</Flex>
                <Flex>CPF: {item.cpf}</Flex>
              </Container>
            );
          })}

        {currentType === "Phone" &&
          phones &&
          phones.length > 0 &&
          phones.map((item, i) => {
            return (
              <Container key={i} onClick={() => changeToEditTab("Phone", item)}>
                <Flex>ID: {item.id}</Flex>
                <Flex>MODELO: {item.model}</Flex>
              </Container>
            );
          })}

        {currentType === "Service" &&
          services &&
          services.length > 0 &&
          services.map((item, i) => {
            return (
              <Container
                key={i}
                onClick={() => changeToEditTab("Service", item)}
              >
                <Flex>ID: {item.id}</Flex>
                <Flex>PREÇO: {item.price}</Flex>
                <Flex>TIPO: {item.type}</Flex>
              </Container>
            );
          })}

        {currentType === "Order" &&
          orders &&
          orders.length > 0 &&
          orders.map((item, i) => {
            return (
              <Container key={i} onClick={() => changeToEditTab("Order", item)}>
                <Flex>ID: {item.id}</Flex>
                <Flex>NOME CLIENTE: {item.name}</Flex>
                <Flex>CPF CLIENTE: {item.cpf}</Flex>
                <Flex>PHONE MODEL: {item.phoneModel}</Flex>
                {item.services && (
                  <>
                    <Flex>SERVIÇOS: </Flex>

                    {item.services.map((w, j) => (
                      <Flex key={j}>• {w.type}</Flex>
                    ))}
                  </>
                )}
              </Container>
            );
          })}
      </Flex>
    </>
  );
}

const Container = ({ children, onClick }: any) => {
  return (
    <Flex
      border={"1px solid #31313176"}
      borderRadius="5px"
      padding={"10px"}
      alignItems="flex-start"
      justifyContent={"flex-start"}
      cursor="pointer"
      _hover={{ opacity: 0.7 }}
      marginBottom="2px"
      flexDirection={"column"}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
