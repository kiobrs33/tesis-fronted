import { createAsyncThunk } from "@reduxjs/toolkit";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  type: string;
}

export const signin = createAsyncThunk(
  "auth/login",
  async (credentials: Credentials) => {
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

export const signup = createAsyncThunk(
  "user/register",
  async (newUser: User) => {
    const response = await fetch("http://localhost:3200/user/", {
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
