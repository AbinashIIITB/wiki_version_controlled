import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import documentsReducer from './documents.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
  },
});

export default store;