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
  | "OrderDetails";

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
      name: "Nome",
    },
  ],
  services: [
    {
      id: 0,
      price: 2,
    },
  ],
  clients: [
    {
      id: 0,
      name: "nome",
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
  },
});

export default AppSlice.reducer;
export const { setLoading, setFocusId, setActiveTab } = AppSlice.actions;
