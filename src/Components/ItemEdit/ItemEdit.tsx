import { Button, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

export default function ItemRegistration() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [orderPhone, setOrderPhone] = useState<string[]>([]);
  const [orderClient, setOrderClient] = useState<string[]>([]);
  const [orderServices, setOrderServices] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);

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
        data = await new ClientsController().updateClient(
          name,
          cpf,
          email,
          currentData?.id || -1
        );
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setClients(data));
        }
        break;
      case "Order":
        data = await new OrdersController().updateOrder(
          getOrderClientId(),
          getOrderPhoneId(),
          getOrderServices(),
          currentData?.id || -1
        );
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setOrders(data));
        }
        break;
      case "Phone":
        data = await new PhonesController().updatePhone(
          model,
          currentData?.id || -1
        );
        if (data !== "fetchError" && data !== "inputsError") {
          dispatch(setPhones(data));
        }
        break;
      case "Service":
        data = await new ServicesController().updateService(
          parseFloat(price),
          type,
          currentData?.id || -1
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

  function initOrder() {
    const data = currentData as OrdersProps;
    setOrderPhone([`ID:${data.idPhone} / ${data.phoneModel}`]);
    setOrderClient([`ID:${data.idClient} / NOME: ${data.name}`]);
    setOrderServices(
      data.services
        ? data.services.map((i) => `ID:${i.id} / ${i.type} / R$${i.price}`)
        : []
    );
  }

  function initClient() {
    const data = currentData as ClientsProps;
    setName(data.name);
    setEmail(data.email);
    setCpf(data.cpf);
  }

  function initPhone() {
    const data = currentData as PhonesProps;
    setModel(data.model);
  }
  function initService() {
    const data = currentData as ServicesProps;
    setType(data.type);
    setPrice(data.price.toString());
  }

  useEffect(() => {
    switch (currentType) {
      case "Client":
        initClient();
        break;
      case "Order":
        initOrder();
        break;
      case "Phone":
        initPhone();
        break;
      case "Service":
        initService();
        break;
    }
  }, [currentType, currentData]);

  return (
    <>
      <Heading marginBottom={"30px"} color={"#6D676E"} size={"lg"}>
        {currentType === "Client" && "Edição Cliente"}
        {currentType === "Phone" && "Edição de Celular"}
        {currentType === "Order" && "Edição Ordem de Serviços"}
        {currentType === "Service" && "Edição de Serviço"}
      </Heading>

      {currentType === "Client" && (
        <>
          <TextInput
            disabled={!edit}
            label="Nome"
            value={name}
            onChange={setName}
          />
          <TextInput
            disabled={!edit}
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <TextInput
            disabled={!edit}
            label="CPF"
            value={cpf}
            onChange={setCpf}
          />
        </>
      )}

      {currentType === "Phone" && (
        <>
          <TextInput
            disabled={!edit}
            label="Modelo"
            value={model}
            onChange={setModel}
          />
        </>
      )}

      {currentType === "Service" && (
        <>
          <TextInput
            disabled={!edit}
            label="Tipo"
            value={type}
            onChange={setType}
          />
          <TextInput
            disabled={!edit}
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
            disabled={!edit}
          />

          <SelectInput
            disabled={!edit}
            label="Cliente"
            onChange={(e) => setOrderClient(e)}
            value={orderClient}
            multiple={false}
            itemsData={clients.map((i) => `ID:${i.id} / NOME: ${i.name}`)}
          />

          <SelectInput
            disabled={!edit}
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
          onClick={() => dispatch(setActiveTab("ListItems"))}
        >
          Cancelar
        </Button>
        <Button
          onClick={edit ? handleRegistry : () => setEdit(true)}
          colorScheme={"whatsapp"}
        >
          {edit ? "Finalizar" : "Editar"}
        </Button>
      </Flex>
    </>
  );
}
