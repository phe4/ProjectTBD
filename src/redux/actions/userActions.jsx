import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utilities/firebase";
import { ref, onValue, update, get } from "firebase/database";
import { setAuth } from "../slices/authSlice";

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (uid, thunkAPI) => {
    try{
      const userRef = ref(db, `/users/${uid}`);
      const snapshot = await get(userRef);
      return snapshot.val();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async ({ uid, data }, thunkAPI) => {
    try{
      const userRef = ref(db, `/users/${uid}`);
      await update(userRef, data);
      const snapshot = await get(userRef);
      return snapshot.val();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkUserUpdateOrCreation = createAsyncThunk(
  'user/checkUserUpdateOrCreation',
  async (user, thunkAPI) => {
    try{
      const userData = await thunkAPI.dispatch(fetchUserData(user.uid)).unwrap();
      const result = userData;
      if (userData) {
        const updates = {};
        if (user.displayName !== userData.displayName) {
          updates.displayName = user.displayName;
        }
        if (user.email !== userData.email) {
          updates.email = user.email;
        }
        if (user.photoURL !== userData.photoURL) {
          updates.photoURL = user.photoURL;
        }
        if (Object.keys(updates).length > 0) {
          result = await thunkAPI.dispatch(updateUserData({ uid: user.uid, data: updates }));
          console.log("update User!", updates);
        }
      } else {
        result = await thunkAPI.dispatch(updateUserData({ uid: user.uid, data: user }));
        console.log("create User!", user);
      }
      // return user;
      return result;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
  