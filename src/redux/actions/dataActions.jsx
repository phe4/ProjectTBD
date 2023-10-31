import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utilities/firebase";
import { ref, update, get, set, query, orderByChild, limitToFirst, remove, startAt, endAt, equalTo } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import Fuse from "fuse.js";
import { validateEvent } from "../../utilities/validation";

export const fetchEvents = createAsyncThunk(
  'data/fetchEvents',
  async ({ filter, searchText, pageSize, pageNumber }, thunkAPI) => {
    let eventsQuery = query(ref(db, 'events'));

    // filter fields: leastCapacity, mostCapacity, timeBefore, timeAfter, locationRadius, topic
    // TODO: add filter fields
    if (filter) {
      // leastCapacity
      if (filter.leastCapacity) {
        eventsQuery = query(eventsQuery, orderByChild('capacity'), startAt(filter.leastCapacity));
      }
      // mostCapacity
      if (filter.mostCapacity) {
        eventsQuery = query(eventsQuery, orderByChild('capacity'), endAt(filter.mostCapacity));
      }
      // timeBefore
      if (filter.timeBefore) {
        eventsQuery = query(eventsQuery, orderByChild('time'), endAt(filter.timeBefore));
      }
      // timeAfter
      if (filter.timeAfter) {
        eventsQuery = query(eventsQuery, orderByChild('time'), startAt(filter.timeAfter));
      }
      // locationRadius
      if (filter.locationRadius) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const radius = filter.locationRadius;
          const latDiff = radius / 69;
          const longDiff = radius / (Math.cos(latitude) * 69);
          const minLat = latitude - latDiff;
          const maxLat = latitude + latDiff;
          const minLong = longitude - longDiff;
          const maxLong = longitude + longDiff;
          eventsQuery = query(eventsQuery, orderByChild('latitude'), startAt(minLat).endAt(maxLat));
          eventsQuery = query(eventsQuery, orderByChild('longitude'), startAt(minLong).endAt(maxLong));
        });
      }
      // topic
      if (filter.topic) {
        eventsQuery = query(eventsQuery, orderByChild('topic'), equalTo(filter.topic));
      }
    }

    let snapshot = null;
    
    if (searchText && searchText !== '') {
      // get all events then apply fuzzy search
      snapshot = await get(eventsQuery);
      const events = snapshot.val() || {};

      // convert events object to array
      const eventsArray = Object.keys(events).map((key) => ({id: key, ...events[key]}));

      const options = {
        includeScore: true,
        keys: ['title', 'description', 'topic', 'location'],
        threshold: 0.3,
      };
      const fuse = new Fuse(eventsArray, options);

      const searchResult = fuse.search(searchText).map((result) => result.item);
      
      // implement pagination
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = pageNumber * pageSize;
      const paginatedResult = searchResult.slice(startIndex, endIndex);

      // convert paginatedResult array to object
      const paginatedResultObject = {};
      paginatedResult.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, paginatedResultObject);

      return paginatedResultObject;
    } else {
        eventsQuery = query(eventsQuery, limitToFirst(pageSize * pageNumber));
        
        const snapshot = await get(eventsQuery);
        return snapshot.val() || {};
    }
  }
);

export const createEvent = createAsyncThunk(
  'data/createEvent',
  async (event, thunkAPI) => {
    const errors = validateEvent(event);
    console.log(errors);
    if (errors !== null && Object.keys(errors).length > 0) {
      return thunkAPI.rejectWithValue(errors);
    }
    const eventId = uuidv4();
    const eventRef = ref(db, `events/${eventId}`);
    console.log(eventRef);
    await set(eventRef, event);
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  'data/updateEvent',
  async (event, thunkAPI) => {
    const eventRef = ref(db, `events/${event.id}`);
    await update(eventRef, event);
    return event;
  }
);

export const deleteEvent = createAsyncThunk(
  'data/deleteEvent',
  async (eventId, thunkAPI) => {
    const eventRef = ref(db, `events/${eventId}`);
    await remove(eventRef);
    return eventId;
  }
);