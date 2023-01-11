import { createSlice } from "@reduxjs/toolkit";
import { UserStore } from "../../models/UserStore";

const initialState : UserStore = {
    email: "",
    name: "",
    surname: "",
    displayName: "",
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      clearState: (state) => {
        state.email = "";
        state.name = "";
        state.surname = "";
        state.displayName = "";
      },
    },
})

export const { clearState } = userSlice.actions;
export const commonSelector = (state: any) => state.user;

export default userSlice;
