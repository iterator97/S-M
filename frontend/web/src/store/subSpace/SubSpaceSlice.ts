import { ISubSpaceSlice } from "../../models";
import { createSlice } from "@reduxjs/toolkit";
import { getSubSpaceData } from "./actions/getSubSpaceData";
import { createNewWorkTask } from "./actions/createNewWorkTask";

const initialState: ISubSpaceSlice = {
  workTasks: null,
  loading: false,
};

const subSpaceSlice = createSlice({
  name: "subSpace",
  initialState: initialState,
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    // Sign in START ->
    builder.addCase(getSubSpaceData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSubSpaceData.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.workTasks = payload;

      return state;
    });
    builder.addCase(getSubSpaceData.rejected, (state, { payload }: any) => {
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

export const { clearState } = subSpaceSlice.actions;
export const userSelector = (state: ISubSpaceSlice) => state;

export default subSpaceSlice;
