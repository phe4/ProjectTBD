import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDmwrkbssHfuE9TOouMeozMW5bPXK39CVU",
  authDomain: "projecttbd-3e473.firebaseapp.com",
  databaseURL: "https://projecttbd-3e473-default-rtdb.firebaseio.com",
  projectId: "projecttbd-3e473",
  storageBucket: "projecttbd-3e473.appspot.com",
  messagingSenderId: "386746273840",
  appId: "1:386746273840:web:b07b7df9d2838995cd9df5",
  measurementId: "G-6CTE20HQ8L"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return [user];
};

export const firebaseSignOut = () => signOut(auth);
