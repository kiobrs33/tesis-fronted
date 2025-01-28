import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

export const getUsersThunk = createAsyncThunk(
  "users",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { token } = state.auth;

    const response = await fetch("http://localhost:3200/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error(data.message);
    }
    return data;
  }
);
