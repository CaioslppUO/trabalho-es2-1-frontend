import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Client {
  name: string;
}

type ActiveTabsProps =
  | "Home"
  | "ShowAllClients"
  | "ClientRegistration"
  | "ClientEdit"
  | "ClientDetails";

export interface AppState {
  clients: Array<Client>;
  isLoading: boolean;
  focusId: string;
  activeTab: ActiveTabsProps;
}

const initialState: AppState = {
  clients: [],
  isLoading: false,
  focusId: "",
  activeTab: "Home",
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
export const { setLoading, setFocusId } = AppSlice.actions;
