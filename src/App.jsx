import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import {useDispatch} from "react-redux";
import { useAuthState } from './utilities/firebase';
import React, { useEffect, useState } from 'react';
import { setAuth } from './redux/actions/authActions';
import MenuBar from './components/menueBar';
import MemoizedEventForm from './components/eventForm';
import { Row } from "react-bootstrap";
import Pages from './pages/pages';
import { BrowserRouter } from "react-router-dom";


const App = () => {
  const [user] = useAuthState();
  const dispatch = useDispatch();
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);

  useEffect(() => {
    if (user) {
      // compare the user from firebase with the user from redux
      // if they are different, update the user in redux
      const updatedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }
      dispatch(setAuth(updatedUser));
    }
  }, [user, dispatch]);

  const openEventForm = () => {
    setIsEventFormVisible(true);
  };

  const closeEventForm = () => {
    setIsEventFormVisible(false);
  };

  return (
    <BrowserRouter>
      <Row className="mb-3 p-0 w-100 m-0">
        <MenuBar openEventForm={openEventForm}/>
      </Row>
      <div className="container mb-5">
        <MemoizedEventForm
          isVisible={isEventFormVisible}
          closeEventForm={closeEventForm}
        />
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
