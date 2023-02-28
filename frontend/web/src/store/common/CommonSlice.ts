import { ICommonSlice } from "./../../models";
import { createSlice } from "@reduxjs/toolkit";
import { signInAction } from "./actions/singInAction";
import { signUp } from "./actions/signUp";

const initialState: ICommonSlice = {
  email: "",
  name: "",
  surname: "",
  displayName: "",
  token: "",
  loading: false,
  signedIn: false,
};

const commonSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    // Sign in
    builder.addCase(signInAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.email = payload.email;
      state.surname = payload.surname;
      state.token = payload.token;
      state.signedIn = true;

      return state;
    });
    builder.addCase(signInAction.rejected, (state, { payload }: any) => {
      return state;
    });

    // Sign up
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.email = payload.email;
      state.surname = payload.surname;
      state.token = payload.token;
      state.signedIn = true;

      return state;
    });
    builder.addCase(signUp.rejected, (state, { payload }: any) => {
      return state;
    });
  },
});

export const { clearState } = commonSlice.actions;
export const userSelector = (state: ICommonSlice) => state;

export default commonSlice;
