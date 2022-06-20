import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientsProps } from "../../controllers/ClientsController";
import { OrdersProps } from "../../controllers/OrdersController";
import { PhonesProps } from "../../controllers/PhonesController";
import { ServicesProps } from "../../controllers/ServicesController";

export type ActiveTabsProps =
  | "Home"
  | "ShowAllClients"
  | "ClientRegistration"
  | "ClientEdit"
  | "ClientDetails"
  | "ShowAllPhones"
  | "PhoneRegistration"
  | "PhoneEdit"
  | "PhoneDetails"
  | "ShowAllServices"
  | "ServiceRegistration"
  | "ServiceEdit"
  | "ServiceDetails"
  | "ShowAllOrders"
  | "orderRegistration"
  | "OrderEdit"
  | "OrderDetails"
  | "LoadLists";

export interface AppState {
  clients: Array<ClientsProps>;
  phones: Array<PhonesProps>;
  orders: Array<OrdersProps>;
  services: Array<ServicesProps>;
  isLoading: boolean;
  focusId: string;
  activeTab: ActiveTabsProps;
}

const initialState: AppState = {
  isLoading: false,
  focusId: "",
  activeTab: "Home",
  orders: [
    {
      id: 0,
    },
  ],
  phones: [
    {
      id: 0,
      model: "",
    },
  ],
  services: [
    {
      id: 0,
      price: 2,
      type: "",
    },
  ],
  clients: [
    {
      id: 0,
      name: "nome",
      cpf: "cpf",
      email: "email",
    },
  ],
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFocusId: (state, action: PayloadAction<string>) => {
      state.focusId = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<ActiveTabsProps>) => {
      state.activeTab = action.payload;
    },
    setClients: (state, action: PayloadAction<ClientsProps[]>) => {
      state.clients = action.payload;
    },
    setPhones: (state, action: PayloadAction<PhonesProps[]>) => {
      state.phones = action.payload;
    },
    setOrders: (state, action: PayloadAction<OrdersProps[]>) => {
      state.orders = action.payload;
    },
    setServices: (state, action: PayloadAction<ServicesProps[]>) => {
      state.services = action.payload;
    },
  },
});

export default AppSlice.reducer;
export const {
  setLoading,
  setFocusId,
  setActiveTab,
  setClients,
  setOrders,
  setPhones,
  setServices,
} = AppSlice.actions;
