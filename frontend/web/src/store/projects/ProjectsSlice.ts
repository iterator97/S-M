import { getProjects } from "./actions/getProjects";
import { createSlice } from "@reduxjs/toolkit";
import { IProjectSlice } from "../../models";
import { getProject } from "./actions/getProject";

const initialState: IProjectSlice = {
  loading: false,
  projects: null,
  selectedProject: null,
  otherUsers: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialState,
  reducers: {
    clearState: (state) => {},
  },
  extraReducers: (builder) => {
    // Get projects
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

    // Get other participants
    // builder.addCase(getOtherParticipants.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(getOtherParticipants.fulfilled, (state, { payload }) => {
    //   state.loading = false;
    //   state.otherUsers = payload;

    //   return state;
    // });
    // builder.addCase(
    //   getOtherParticipants.rejected,
    //   (state, { payload }: any) => {
    //     return state;
    //   }
    // );

    // Get project data
    builder.addCase(getProject.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProject.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.selectedProject = payload;

      return state;
    });
    builder.addCase(getProject.rejected, (state, { payload }: any) => {
      return state;
    });
  },
});

export const { clearState } = projectsSlice.actions;
export const userSelector = (state: IProjectSlice) => state;

export default projectsSlice;
