import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersThunk,
  registerUserThunk,
  updateUserThunk,
} from "./clientsThunks";

interface IClient {
  user_id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: string;
}

interface IClients {
  isOk: boolean;
  isLoading: boolean;
  responseMessage?: string;
  clients: IClient[];
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
  clients: [],
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
    // console.log("CLIENTS persistedState", JSON.parse(persistedState));
    return JSON.parse(persistedState).clients;
  }
  return defaultState;
})();

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const { id, updatedData } = action.payload;
      const clientIndex = state.clients.findIndex(
        (client) => client.user_id === id
      );

      if (clientIndex !== -1) {
        state.clients[clientIndex] = {
          ...state.clients[clientIndex],
          ...updatedData,
        };
      }
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

    // createUser
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.payload.message;
        // state.clients = action.payload.data.items;
        state.clients.push(action.payload.data.user);
        // state.total_items = action.payload.data.total_items;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.error.message;
      });

    // updateUser
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.payload.message;
        const clientIndex = state.clients.findIndex(
          (client) => client.user_id === action.payload.data.user.user_id
        );
        if (clientIndex !== -1) {
          state.clients[clientIndex] = {
            ...state.clients[clientIndex],
            ...action.payload.data.user,
          };
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.error.message;
      });
  },
});

export const { addClient } = clientsSlice.actions;
