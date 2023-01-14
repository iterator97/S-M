import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import commonSlice from "./common/CommonSlice";
import spaceSlice from "./space/SpaceSlice";

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    space: spaceSlice.reducer,
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
