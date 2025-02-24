import {configureStore} from '@reduxjs/toolkit';
import draftReducer from './draftSlice';
import themeReducer from './themeSlice';
import appReducer from './app';

export const store = configureStore({
  reducer: {drafts: draftReducer, app: appReducer, theme: themeReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
