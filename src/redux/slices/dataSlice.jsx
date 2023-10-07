import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  sports: [],
  users: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setSports(state, action) {
      state.sports = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setEvents, setSports, setUsers } = dataSlice.actions;
export default dataSlice.reducer;