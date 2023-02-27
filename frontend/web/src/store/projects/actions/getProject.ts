import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProject = createAsyncThunk(
  "project/getProject",
  async (projectId: string, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:44352/api/project/getProject/${projectId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
