import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import {
  ClientsController,
  ClientsProps,
} from "../../controllers/ClientsController";
import {
  OrdersController,
  OrdersProps,
} from "../../controllers/OrdersController";
import {
  PhonesController,
  PhonesProps,
} from "../../controllers/PhonesController";
import {
  ServicesController,
  ServicesProps,
} from "../../controllers/ServicesController";
import { useAppDispatch } from "../../store/hooks";
import {
  setActiveTab,
  setClients,
  setLoading,
  setOrders,
  setPhones,
  setServices,
} from "../../store/reducers/appReducer";
import { useToast } from "@chakra-ui/react";
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";

interface ItemRegistration {
  typeItem: "Phone" | "Client" | "Order" | "Service";
}

export default function ItemRegistration({ typeItem }: ItemRegistration) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const toast = useToast();
  const dispatch = useAppDispatch();

  function showRegistryError() {
    toast({
      title: "Erro ao cadastrar!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  async function registryClient() {
    const clientController = new ClientsController();
    const newClient: ClientsProps = {
      cpf,
      name,
      email,
      id: -1,
    };
    const clients = await clientController.RegistryNewClient(newClient);

    if (clients !== -1) {
      dispatch(setClients(clients));

      toast({
        title: "Cliente registrado!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      showRegistryError();
    }
  }

  async function registryOrder() {
    const oc = new OrdersController();
    const newOrder: OrdersProps = {
      id: -1,
    };
    const orders = await oc.RegistryNewOrder(newOrder);

    if (orders !== -1) {
      dispatch(setOrders(orders));
      toast({
        title: "Ordem de Serviços cadastrada!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      showRegistryError();
    }
  }

  async function registryPhone() {
    const pc = new PhonesController();
    const newPhone: PhonesProps = {
      id: -1,
      model,
    };
    const phones = await pc.RegistryNewPhone(newPhone);

    if (phones !== -1) {
      dispatch(setPhones(phones));

      toast({
        title: "Celular cadastrado!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      showRegistryError();
    }
  }

  async function registryService() {
    const sc = new ServicesController();
    const newService: ServicesProps = {
      id: -1,
      price: parseFloat(price),
      type,
    };
    const services = await sc.RegistryNewService(newService);

    if (services !== -1) {
      dispatch(setServices(services));

      toast({
        title: "Serviço cadastrado!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      showRegistryError();
    }
  }
  async function handleRegistry() {
    dispatch(setLoading(true));
    if (
      typeItem === "Client" &&
      cpf.length > 10 &&
      name.length > 3 &&
      email.length > 3
    ) {
      await registryClient();
    } else if (typeItem === "Order") {
      await registryOrder();
    } else if (typeItem === "Phone" && model.length > 1) {
      await registryPhone();
    } else if (typeItem === "Service" && price.length > 0 && type.length > 2) {
      await registryService();
    } else {
      toast({
        title: "Dados incorretos",
        description: "Verifique o preenchimento dos dados.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    dispatch(setActiveTab("Home"));

    dispatch(setLoading(false));
  }
  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        {typeItem === "Client" && "Cadastro Cliente"}
        {typeItem === "Phone" && "Cadastro de Celular"}
        {typeItem === "Order" && "Cadastro Ordem de Serviços"}
        {typeItem === "Service" && "Cadastro de Serviço"}
      </Heading>

      {typeItem === "Client" && (
        <>
          <TextInput label="Nome" value={name} onChange={setName} />
          <TextInput label="Email" value={email} onChange={setEmail} />
          <TextInput label="CPF" value={cpf} onChange={setCpf} />
        </>
      )}

      {typeItem === "Phone" && (
        <>
          <TextInput label="Modelo" value={model} onChange={setModel} />
        </>
      )}

      {typeItem === "Service" && (
        <>
          <TextInput label="Tipo" value={type} onChange={setType} />
          <TextInput
            label="Preço"
            type={"number"}
            value={price}
            onChange={setPrice}
          />
        </>
      )}

      {typeItem === "Order" && (
        <>
          <SelectInput
            label="Serviços"
            onChange={(e) => console.log(e)}
            value={["dado1"]}
            multiple
            itemsData={["dado1", "dado2", "dado3"]}
          />

          <SelectInput
            label="Celular"
            onChange={(e) => console.log(e)}
            value={[]}
            multiple={false}
            itemsData={["dado1", "dado2", "dado3"]}
          />
        </>
      )}

      <Flex gap="30px" marginTop="30px">
        <Button
          colorScheme={"blackAlpha"}
          onClick={() => dispatch(setActiveTab("Home"))}
        >
          Cancelar
        </Button>
        <Button onClick={handleRegistry} colorScheme={"whatsapp"}>
          Finalizar
        </Button>
      </Flex>
    </>
  );
}
