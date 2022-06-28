import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { ClientsController } from "../../controllers/ClientsController";
import { OrdersController } from "../../controllers/OrdersController";
import { PhonesController } from "../../controllers/PhonesController";
import { ServicesController } from "../../controllers/ServicesController";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
import { RegistryError } from "../../types/RegistryError";

export default function ItemEdit() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [orderPhone, setOrderPhone] = useState<string[]>([]);
  const [orderClient, setOrderClient] = useState<string[]>([]);
  const [orderServices, setOrderServices] = useState<string[]>([]);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const { clients, services, phones, currentData, currentType } =
    useAppSelector((s) => s.app);

  function showRegistryError(type: "inputs" | "fetch") {
    toast({
      title: type === "inputs" ? "Dados incorretos!" : "Erro ao cadastrar!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  function showRegistrySucess() {
    const type =
      currentType === "Client"
        ? "Client"
        : currentType === "Phone"
        ? "Celular"
        : currentType === "Service"
        ? "Serviço"
        : "Ordem de Serviço";

    toast({
      title: `${type} registrado!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function getOrderClientId() {
    return orderClient.length === 1
      ? parseInt(orderClient[0].replace(/\s/g, "").split("/")[0].split(":")[1])
      : -1;
  }

  function getOrderPhoneId() {
    return orderPhone.length === 1
      ? parseInt(orderPhone[0].replace(/\s/g, "").split("/")[0].split(":")[1])
      : -1;
  }

  function getOrderServices() {
    return orderServices.map((i) =>
      parseInt(i.replace(/\s/g, "").split("/")[0].split(":")[1])
    );
  }

  async function handleRegistry() {
    dispatch(setLoading(true));
    let data;

    switch (currentType) {
      case "Client":
        data = await new ClientsController().RegistryNewClient(
          name,
          cpf,
          email
        );
        console.log("AAA", data);
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setClients(data));
        }
        break;
      case "Order":
        data = await new OrdersController().RegistryNewOrder(
          getOrderClientId(),
          getOrderPhoneId(),
          getOrderServices()
        );
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setOrders(data));
        }
        break;
      case "Phone":
        data = await new PhonesController().RegistryNewPhone(model);
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setPhones(data));
        }
        break;
      case "Service":
        data = await new ServicesController().RegistryNewService(
          parseFloat(price),
          type
        );
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setServices(data));
        }
        break;
      default:
        data = "inputsError" as RegistryError;
        break;
    }

    dispatch(setLoading(false));

    if (data === "fetchError") {
      showRegistryError("fetch");
    } else if (data === "inputsError") {
      showRegistryError("inputs");
    } else {
      showRegistrySucess();
      dispatch(setActiveTab("ListItems"));
    }
  }

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        Cadastro
        {currentType === "Client" && " de Cliente"}
        {currentType === "Phone" && " de Celular"}
        {currentType === "Order" && "de Ordem de Serviços"}
        {currentType === "Service" && " de Serviço"}
      </Heading>

      {currentType === "Client" && (
        <>
          <TextInput label="Nome" value={name} onChange={setName} />
          <TextInput label="Email" value={email} onChange={setEmail} />
          <TextInput label="CPF" value={cpf} onChange={setCpf} />
        </>
      )}

      {currentType === "Phone" && (
        <>
          <TextInput label="Modelo" value={model} onChange={setModel} />
        </>
      )}

      {currentType === "Service" && (
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

      {currentType === "Order" && (
        <>
          <SelectInput
            label="Celular"
            onChange={(e) => setOrderPhone(e)}
            value={orderPhone}
            multiple={false}
            itemsData={phones.map((i) => `ID:${i.id} / ${i.model}`)}
          />

          <SelectInput
            label="Cliente"
            onChange={(e) => setOrderClient(e)}
            value={orderClient}
            multiple={false}
            itemsData={clients.map((i) => `ID:${i.id} / NOME: ${i.name}`)}
          />

          <SelectInput
            label="Serviços"
            onChange={(e) => setOrderServices(e)}
            value={orderServices}
            multiple
            itemsData={services.map(
              (i) => `ID:${i.id} / ${i.type} / R$${i.price}`
            )}
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
