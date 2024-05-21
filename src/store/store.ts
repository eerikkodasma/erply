import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/AuthReducer';
import newsReducer from '../reducers/NewsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;