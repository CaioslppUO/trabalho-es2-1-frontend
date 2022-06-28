import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientsProps } from "../../controllers/ClientsController";
import { OrdersProps } from "../../controllers/OrdersController";
import { PhonesProps } from "../../controllers/PhonesController";
import { ServicesProps } from "../../controllers/ServicesController";

export type TypeItem = "Phone" | "Client" | "Order" | "Service" | "None";
export type TypeData =
  | ClientsProps
  | PhonesProps
  | OrdersProps
  | ServicesProps
  | null;
export type ActiveTabsProps =
  | "Home"
  | "Registration"
  | "Edit"
  | "ListItems"
  | "LoadLists";

export interface AppState {
  clients: Array<ClientsProps>;
  phones: Array<PhonesProps>;
  orders: Array<OrdersProps>;
  services: Array<ServicesProps>;
  currentType: TypeItem;
  isLoading: boolean;
  focusId: string;
  activeTab: ActiveTabsProps;
  currentData: TypeData;
}
const initialState: AppState = {
  isLoading: false,
  focusId: "",
  activeTab: "Home",
  currentType: "None",
  currentData: null,
  orders: [
    {
      id: 0,
      name: "",
      cpf: "",
      email: "",
      idClient: "",
      idPhone: 0,
      phoneModel: "",
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
    setCurrentItem: (state, action: PayloadAction<TypeData>) => {
      state.currentData = action.payload;
    },
    setCurrentType: (state, action: PayloadAction<TypeItem>) => {
      state.currentType = action.payload;
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
  setCurrentItem,
  setCurrentType,
} = AppSlice.actions;
