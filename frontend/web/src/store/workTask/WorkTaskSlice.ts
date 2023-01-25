import { getSubSpaceWorkTasks } from "./actions/getSubSpaceWorkTasks";
import { createSlice } from "@reduxjs/toolkit";
import { IWorkTaskSlice } from "../../models";

const initialState: IWorkTaskSlice = {
  workTasks: null,
  loading: false,
};

const workTaskSlice = createSlice({
  name: "workTask",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.workTasks = null;
    },
  },
  extraReducers: (builder) => {
    // Get work tasks start ->
    builder.addCase(getSubSpaceWorkTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSubSpaceWorkTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.workTasks = payload;

      return state;
    });
    builder.addCase(
      getSubSpaceWorkTasks.rejected,
      (state, { payload }: any) => {
        state.loading = false;

        return state;
      }
    );
    // Get work tasks end
  },
});

export const { clearState } = workTaskSlice.actions;
export const userSelector = (state: IWorkTaskSlice) => state;

export default workTaskSlice;
