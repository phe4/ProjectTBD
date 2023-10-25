import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchEvents.pending, (state, action) => {
  //       state.status = 'pending';
  //     })
  //     .addCase(fetchEvents.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.events = state.events.concat(action.payload);
  //     })
  //     .addCase(fetchEvents.rejected, (state, action) => {
  //       state.status = 'idle';
  //       state.error = action.error.message;
  //     })    
  // },
});

export default dataSlice.reducer;