import { ISignIn } from "../../../models";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubSpaceWorkTasks = createAsyncThunk(
  "workTask/getWorkTasks",
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:44352/api/subspace/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // console.log("Get subspace tasks data");
      // console.log(data);

      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
);
