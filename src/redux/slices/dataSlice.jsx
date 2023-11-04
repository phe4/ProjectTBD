import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../actions/dataActions';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'idle';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(createEvent.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.events = state.events.concat(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(updateEvent.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.events.findIndex((event) => event.id === action.payload.id);
        state.events[index] = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(deleteEvent.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = 'idle';
        state.events = state.events.filter((event) => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })    
  },
});

export default dataSlice.reducer;