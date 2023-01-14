import { createSlice } from "@reduxjs/toolkit";
import CommonStore from "../../models/store/CommonStore";
import { signInAction } from "./actions/singInAction";

const initialState: CommonStore = {
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
    // Sign in START ->
    builder.addCase(signInAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInAction.fulfilled, (state, { payload }) => {
      console.log(payload);

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
    // Sign in END ->
  },
});

export const { clearState } = commonSlice.actions;
export const userSelector = (state: CommonStore) => state;

export default commonSlice;
