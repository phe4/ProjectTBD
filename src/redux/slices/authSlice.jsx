import { createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle, setAuth } from '../actions/authActions';

const initialState = {
  user: null,
  token: null,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signOutAuth(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setAuth.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(setAuth.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
      })
      .addCase(setAuth.rejected, (state, action) => {
        state.error = action.payload;
      })
  }
});

export const { login, signOutAuth } = authSlice.actions;
export default authSlice.reducer;