import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;