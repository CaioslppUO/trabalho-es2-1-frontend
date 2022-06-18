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
            return <Container key={i}>Nome: {item.name}</Container>;
          })}

        {phones &&
          phones.length > 0 &&
          phones.map((item, i) => {
            return <Container key={i}>Nome: {item.name}</Container>;
          })}

        {services &&
          services.length > 0 &&
          services.map((item, i) => {
            return <Container key={i}>Valor: {item.price}</Container>;
          })}

        {orders &&
          orders.length > 0 &&
          orders.map((item, i) => {
            return <Container key={i}>id: {item.id}</Container>;
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
      alignItems="center"
      justifyContent={"space-between"}
      cursor="pointer"
      _hover={{ opacity: 0.7 }}
      marginBottom="2px"
    >
      {children}
    </Flex>
  );
};
