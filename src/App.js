import './App.css';
import {useDispatch} from "react-redux";
import { signInWithGoogle } from './redux/actions/authActions';
import { useAuthState, signOut } from './utilities/firebase';
import { useEffect } from 'react';
import { checkUserUpdateOrCreation } from './redux/actions/userActions';
import { setAuth } from './redux/actions/authActions';

function App() {
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

  const loginWithGoogle = () => {
    console.log("login")
    // get the registration token from url
    const registrationToken = new URLSearchParams(window.location.search).get('token');
    dispatch(signInWithGoogle({registrationToken}));
  }

  return (
    <div className="App">
      { user ? <h1>Logged in as {user.displayName}</h1> : <h1>Not logged in</h1> }
      <button onClick={loginWithGoogle}>Login</button>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default App;
