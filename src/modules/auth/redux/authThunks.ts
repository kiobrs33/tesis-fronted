import { createAsyncThunk } from "@reduxjs/toolkit";

interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: "ADMIN" | "CLIENT";
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: ICredentials) => {
    const response = await fetch("http://localhost:3200/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      throw new Error(data.message);
    }
    return data;
  }
);

export const registerThunk = createAsyncThunk(
  "user/register",
  async (newUser: IUser) => {
    const response = await fetch("http://localhost:3200/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
