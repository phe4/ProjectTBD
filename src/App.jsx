import './App.css';
import {useDispatch} from "react-redux";
import { signInWithGoogle } from './redux/actions/authActions';
import { useAuthState, firebaseSignOut } from './utilities/firebase';
import { useEffect } from 'react';
import { signOutAuth } from './redux/slices/authSlice';
import { logOutUser } from './redux/slices/userSlice';
import { setAuth } from './redux/actions/authActions';
import HomeAdmin from './pages/HomeAdmin';
import HomeInstructor from './pages/HomeInstr';
import HomeUser from './pages/HomeUser';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthGuard from './utilities/authGuard';

const App = () => {
  const [user] = useAuthState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const updatedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      dispatch(setAuth(updatedUser));
      // dispatch(checkUserUpdateOrCreation(updatedUser));
    }
  }, [user])

  // const loginWithGoogle = () => {
  //   console.log("login")
  //   // get the registration token from url
  //   const registrationToken = new URLSearchParams(window.location.search).get('token');
  //   dispatch(signInWithGoogle({registrationToken}));
  // }

  // const logout = () => {
  //   console.log("logout")
  //   dispatch(signOutAuth());
  //   dispatch(logOutUser());
  //   firebaseSignOut();
  // }

  // return (
  //   <div className="App">
  //     { user ? <h1>Logged in as {user.displayName}</h1> : <h1>Not logged in</h1> }
  //     <button onClick={loginWithGoogle}>Login</button>
  //     <button onClick={logout}>Logout</button>
  //   </div>
  // );

  return (
    // router for / default path, /admin, /instructor, /user and * for 404
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/admin" element={
          <AuthGuard requiredRole={["admin"]}>
            <HomeAdmin />
          </AuthGuard>
        } />
        <Route path="/instructor" element={
          <AuthGuard requiredRole={["instructor"]}>
            <HomeInstructor />
          </AuthGuard>
        } />
        <Route path="*" element={
          <div>
            <h1>404</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
