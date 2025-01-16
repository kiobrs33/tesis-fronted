import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunks";

interface Auth {
  isOk: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  responseMessage?: string;
  token: string;
  user: {
    user_id: null | number;
    firstname: string;
    lastname: string;
    age: null | number;
    email: string;
    password: string;
    type: string;
  };
}

const defaultState: Auth = {
  isOk: false,
  isLoading: false,
  isAuthenticated: false,
  responseMessage: "",
  token: "",
  user: {
    user_id: null,
    firstname: "",
    lastname: "",
    age: null,
    email: "",
    password: "",
    type: "",
  },
};

const initialState: Auth = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    console.log(JSON.parse(persistedState));
    return JSON.parse(persistedState).auth;
  }
  return defaultState;
})();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = defaultState.user;
      state.token = "";
      state.isAuthenticated = false;
      state.responseMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.payload.message;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.responseMessage = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
