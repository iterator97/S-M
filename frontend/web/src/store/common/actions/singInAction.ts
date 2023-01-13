import { createAsyncThunk } from "@reduxjs/toolkit";
import SignInData from "../../../models/user/SignInData";

export const signInAction = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: SignInData, thunkAPI) => {
    console.log("action inside");
    try {
      const response = await fetch("http://localhost:44352/api/account/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
);
