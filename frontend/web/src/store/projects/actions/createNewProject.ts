import { createAsyncThunk } from "@reduxjs/toolkit";
import { INewProjectDto } from "../../../models";

export const createNewProject = createAsyncThunk(
  "project/CreateNewProject",
  async (
    { Name, Description, StartDate, EndDate, SubProjects }: INewProjectDto,
    thunkAPI
  ) => {
    try {
      const response = await fetch("http://localhost:44352/api/project", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Name,
          Description,
          StartDate,
          EndDate,
          SubProjects,
        }),
      });

      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {}
  }
);
