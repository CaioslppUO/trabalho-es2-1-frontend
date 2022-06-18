import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ClientsProps } from "../../controllers/ClientsController";
import { OrdersProps } from "../../controllers/OrdersController";
import { PhonesProps } from "../../controllers/PhonesController";
import { ServicesProps } from "../../controllers/ServicesController";

interface ListItemsProps {
  title?: string;
  clients?: ClientsProps[];
  orders?: OrdersProps[];
  phones?: PhonesProps[];
  services?: ServicesProps[];
}
export function ListItems({
  title = "Item List",
  clients,
  orders,
  phones,
  services,
}: ListItemsProps) {
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        {title}
      </Heading>

      <Flex gap={"13px"} wrap="wrap">
        {clients &&
          clients.length > 0 &&
          clients.map((item, i) => {
            return (
              <Container key={i}>
                <Flex>ID: {item.id}</Flex>
                <Flex>NOME: {item.name}</Flex>
                <Flex>EMAIL: {item.email}</Flex>
                <Flex>CPF: {item.cpf}</Flex>
              </Container>
            );
          })}

        {phones &&
          phones.length > 0 &&
          phones.map((item, i) => {
            return (
              <Container key={i}>
                <Flex>ID: {item.id}</Flex>
                <Flex>MODELO: {item.model}</Flex>
              </Container>
            );
          })}

        {services &&
          services.length > 0 &&
          services.map((item, i) => {
            return (
              <Container key={i}>
                <Flex>ID: {item.id}</Flex>
                <Flex>PREÇO: {item.price}</Flex>
                <Flex>TIPO: {item.type}</Flex>
              </Container>
            );
          })}

        {orders &&
          orders.length > 0 &&
          orders.map((item, i) => {
            return (
              <Container key={i}>
                <Flex>ID: {item.id}</Flex>
              </Container>
            );
          })}
      </Flex>
    </>
  );
}

const Container = ({ children }: any) => {
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
    >
      {children}
    </Flex>
  );
};
