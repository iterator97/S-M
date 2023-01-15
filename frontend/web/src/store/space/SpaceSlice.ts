import { getSpaces } from "./actions/getSpaces";
import { ISpaceSlice } from "./../../models/slice/ISpaceSlice";
import { ICommonSlice } from "./../../models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ISpaceSlice = {
  loading: false,
  spaces: null,
};

const spaceSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    // Sign in START ->
    builder.addCase(getSpaces.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSpaces.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.spaces = payload;

      return state;
    });
    builder.addCase(getSpaces.rejected, (state, { payload }: any) => {
      return state;
    });
    // Sign in END ->
  },
});

export const { clearState } = spaceSlice.actions;
export const userSelector = (state: ISpaceSlice) => state;

export default spaceSlice;
