import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../utilities/firebase";
import { setUser } from "../slices/userSlice";
import { checkUserUpdateOrCreation } from "./userActions";
import { fetchUserData } from "./userActions";

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async ({registrationToken}, thunkAPI) => {
    try{
      // TODO: add registration token validation
      // check if the token is generated by the admin and if it is not used
      console.log(registrationToken);
      const checkResult = false;
      if(registrationToken !== null && registrationToken !== undefined){
        if(!checkResult){
          alert("Invalid registration token");
          return thunkAPI.rejectWithValue("Invalid registration token");
        }
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // check if the user is already registered
      const userRef = await thunkAPI.dispatch(fetchUserData(result.user.uid)).unwrap();
      if (userRef.role === "user" && registrationToken && checkResult) {
        alert("Please contact the admin to upgrade your account");
        return thunkAPI.rejectWithValue("Please contact the admin to upgrade your account");
      }


      const token = result.user.accessToken;
      const user = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: userRef.role || checkResult ? "Instructor" : "user",
      };
      // thunkAPI.dispatch(setUser(user));
      // thunkAPI.dispatch(checkUserUpdateOrCreation(user));
      console.log(user);
      return { user, token };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setAuth = createAsyncThunk(
  'auth/setAuth',
  async (user, thunkAPI) => {
    try{
      const res = await thunkAPI.dispatch(checkUserUpdateOrCreation(user));
      console.log(res.payload);
      return res.payload;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);