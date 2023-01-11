import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonSlice from './common/CommonSlice';
import userSlice from './user/UserSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    common: commonSlice.reducer,
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
