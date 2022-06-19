import { Flex, CircularProgress } from "@chakra-ui/react";
import { Dispatch, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Menu from "./Components/Menu";
import { ListItems } from "./Components/ListItems/ListItems";
import ItemRegistration from "./Components/ItemRegistration/ItemRegistration";
import { ClientsController } from "./controllers/ClientsController";
import { OrdersController } from "./controllers/OrdersController";
import { PhonesController } from "./controllers/PhonesController";
import { ServicesController } from "./controllers/ServicesController";
import { AnyAction } from "@reduxjs/toolkit";
import LoadLists from "./Components/LoadLists/LoadLists";
import Homepage from "./Components/Home/HomePage";
import {
  setClients,
  setLoading,
  setOrders,
  setPhones,
  setServices,
} from "./store/reducers/appReducer";

export default function Home() {
  const { isLoading, activeTab, clients, orders, services, phones } =
    useAppSelector((s) => s.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initState(dispatch);
  }, []);

  if (isLoading) {
    return (
      <Flex w="100vw" h="100vh" alignItems={"center"} justifyContent="center">
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }
  return (
    <Flex w={"100vw"}>
      <Menu />
      <Flex padding={"15px"} flexDirection={"column"} w="100%">
        {activeTab === "Home" && <Homepage />}
        {activeTab === "ShowAllClients" && (
          <ListItems title="Clientes Registrados" clients={clients} />
        )}
        {activeTab === "ShowAllOrders" && (
          <ListItems title="Ordens Registrados" orders={orders} />
        )}
        {activeTab === "ShowAllPhones" && (
          <ListItems title="Celulares Registrados" phones={phones} />
        )}
        {activeTab === "ShowAllServices" && (
          <ListItems title="Serviços Registrados" services={services} />
        )}
        {activeTab === "ClientRegistration" && (
          <ItemRegistration typeItem="Client" />
        )}
        {activeTab === "orderRegistration" && (
          <ItemRegistration typeItem="Order" />
        )}
        {activeTab === "PhoneRegistration" && (
          <ItemRegistration typeItem="Phone" />
        )}
        {activeTab === "ServiceRegistration" && (
          <ItemRegistration typeItem="Service" />
        )}
        {activeTab === "LoadLists" && <LoadLists />}
      </Flex>
    </Flex>
  );
}

async function initState(dispatch: Dispatch<AnyAction>) {
  dispatch(setLoading(true));
  const clientsController = new ClientsController();
  const clients = await clientsController.fetchClients();
  dispatch(setClients(clients));

  const ordersController = new OrdersController();
  const orders = await ordersController.fetchOrders();
  dispatch(setOrders(orders));

  const phonesController = new PhonesController();
  const phones = await phonesController.fetchPhones();
  dispatch(setPhones(phones));

  const servicesController = new ServicesController();
  const services = await servicesController.fetchServices();
  dispatch(setServices(services));

  dispatch(setLoading(false));
}
