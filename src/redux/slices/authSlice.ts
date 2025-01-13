import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../thunks/authThunks";

interface Auth {
  status?: string;
  isLoading: boolean;
  message?: string;
  token: string;
  user: {
    user_id: string;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    password: string;
    type: string;
  };
}

const defaultState: Auth = {
  status: "",
  isLoading: false,
  message: "",
  token: "",
  user: {
    user_id: "",
    firstname: "",
    lastname: "",
    age: 0,
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
      state.message = "";
      state.status = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      });

    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

// Actions
export const { logout } = authSlice.actions;
