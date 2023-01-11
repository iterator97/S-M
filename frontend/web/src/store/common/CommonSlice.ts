import { createSlice } from "@reduxjs/toolkit";
import { CommonStore } from "../../models";
import { UserStore } from "../../models/UserStore";

const initialState : CommonStore = {
    token: "",
}

const commonSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.token = "";
      },
    },
})

export const { clearState } = commonSlice.actions;
export const userSelector = (state: any) => state.user;

export default commonSlice;
