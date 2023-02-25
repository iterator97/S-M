import { ISubProjectSlice } from "../../models";
import { createSlice } from "@reduxjs/toolkit";
import { getSubProjectData } from "./actions/getSubProjectData";
import { createNewWorkTask } from "./actions/createNewWorkTask";

const initialState: ISubProjectSlice = {
  workTasks: null,
  loading: false,
};

const subProjectSlice = createSlice({
  name: "subProject",
  initialState: initialState,
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    // Sign in START ->
    builder.addCase(getSubProjectData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSubProjectData.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.workTasks = payload;

      return state;
    });
    builder.addCase(getSubProjectData.rejected, (state, { payload }: any) => {
      return state;
    });

    builder.addCase(createNewWorkTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewWorkTask.fulfilled, (state, { payload }) => {
      return state;
    });
    builder.addCase(createNewWorkTask.rejected, (state, { payload }: any) => {
      return state;
    });
    // Sign in END ->
  },
});

export const { clearState } = subProjectSlice.actions;
export const userSelector = (state: ISubProjectSlice) => state;

export default subProjectSlice;
