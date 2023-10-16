import { createSlice } from '@reduxjs/toolkit';
import { fetchUserData, updateUserData } from '../actions/userActions';

const initialState = {
  user: null,
  loading: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logOutUser(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = 'idle';
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = 'idle';
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = 'idle';
      })
  }
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;