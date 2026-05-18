import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import documentsReducer from './documents.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;