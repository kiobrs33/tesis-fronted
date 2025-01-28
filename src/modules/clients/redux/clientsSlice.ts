import { createSlice } from "@reduxjs/toolkit";
import { getUsersThunk } from "./clientsThunks";

interface IClients {
  isOk: boolean;
  isLoading: boolean;
  responseMessage?: string;
  clients: [
    {
      user_id: null | number;
      firstname: string;
      lastname: string;
      age: null | number;
      email: string;
      password: string;
      type: string;
    }
  ];
  total_items: number;
  pagination: {
    total_items: number;
    total_pages: number;
    currrent_page: number;
    item_per_page: number;
  };
}

const defaultState: IClients = {
  isOk: false,
  isLoading: false,
  responseMessage: "",
  clients: [
    {
      user_id: null,
      firstname: "",
      lastname: "",
      age: null,
      email: "",
      password: "",
      type: "",
    },
  ],
  total_items: 0,
  pagination: {
    total_items: 0,
    total_pages: 0,
    currrent_page: 0,
    item_per_page: 0,
  },
};

const initialState: IClients = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    console.log(JSON.parse(persistedState));
    return JSON.parse(persistedState).auth;
  }
  return defaultState;
})();

export const clientsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
  },
  // Llamadas asíncronas apis
  extraReducers: (builder) => {
    // getUsers
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.payload.message;
        state.clients = action.payload.data.items;
        state.total_items = action.payload.data.total_items;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.error.message;
      });
  },
});

export const { addClient } = clientsSlice.actions;
