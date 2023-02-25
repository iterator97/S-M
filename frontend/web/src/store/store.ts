import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import commonSlice from "./common/CommonSlice";
import projectsSlice from "./projects/ProjectsSlice";
import subProjectSlice from "./subProjects/SubProjectSlice";
import workTaskSlice from "./workTask/WorkTaskSlice";

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    projects: projectsSlice.reducer,
    workTask: workTaskSlice.reducer,
    subProject: subProjectSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
