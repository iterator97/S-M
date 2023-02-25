import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWorkTask } from "../../../models";

export const createNewWorkTask = createAsyncThunk(
  "subSpace/createNewWorkTask",
  async (
    { Content, SubContent, SubSpaceId, SubTasks }: IWorkTask,
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        "http://localhost:44352/api/workTask/create",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            Content,
            SubContent,
            SubSpaceId,
            SubTasks,
          }),
        }
      );

      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {}
  }
);
