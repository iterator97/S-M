import { getProjects } from "./actions/getProjects";
import { createSlice } from "@reduxjs/toolkit";
import { IProjectSlice } from "../../models";
import { getOtherParticipants } from "./actions/getOtherParticipants";

const initialState: IProjectSlice = {
  loading: false,
  projects: null,
  otherUsers: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    // Sign in START ->
    builder.addCase(getProjects.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.projects = payload;

      return state;
    });
    builder.addCase(getProjects.rejected, (state, { payload }: any) => {
      return state;
    });

    builder.addCase(getOtherParticipants.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOtherParticipants.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.otherUsers = payload;

      return state;
    });
    builder.addCase(
      getOtherParticipants.rejected,
      (state, { payload }: any) => {
        return state;
      }
    );
    // Sign in END ->
  },
});

export const { clearState } = projectsSlice.actions;
export const userSelector = (state: IProjectSlice) => state;

export default projectsSlice;
