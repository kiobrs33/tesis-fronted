import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";

export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: "ADMIN" | "CLIENT";
}

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

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (newUser: IUser, { getState }) => {
    const state = getState() as RootState;
    const { token } = state.auth;

    const response = await fetch("http://localhost:3200/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      throw new Error(data.message);
    }
    return data;
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (newUser: IUser, { getState }) => {
    const state = getState() as RootState;
    const { token } = state.auth;

    const response = await fetch(
      `http://localhost:3200/user/${newUser.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      throw new Error(data.message);
    }
    return data;
  }
);
