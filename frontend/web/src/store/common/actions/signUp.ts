import { ISignIn, ISignUp } from "../../../models";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ name, surname, email, password }: ISignUp, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:44352/api/account/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            surname,
            email,
            password,
          }),
        }
      );
      let data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {}
  }
);
