import { useEffect, useState, useCallback } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { 
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDmwrkbssHfuE9TOouMeozMW5bPXK39CVU",
  authDomain: "projecttbd-3e473.firebaseapp.com",
  projectId: "projecttbd-3e473",
  storageBucket: "projecttbd-3e473.appspot.com",
  messagingSenderId: "386746273840",
  appId: "1:386746273840:web:b07b7df9d2838995cd9df5",
  measurementId: "G-6CTE20HQ8L"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(() => {
    signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    login,
    logout
  };
}
