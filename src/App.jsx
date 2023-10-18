import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {useDispatch, useSelector} from "react-redux";
import { useAuthState } from './utilities/firebase';
import React, { useEffect, useState } from 'react';
import { setAuth } from './redux/actions/authActions';
import MenuBar from './components/menueBar';
import EventForm from './components/eventForm';
import { Row } from "react-bootstrap";
import Pages from './pages/pages';


const App = () => {
  const [user] = useAuthState();
  const dispatch = useDispatch();
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);

  const reduxAuth = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // compare the user from firebase with the user from redux
      // if they are different, update the user in redux
      const updatedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: reduxAuth?.user?.role || "user",
      }
      console.log(updatedUser);
      dispatch(setAuth(updatedUser));
      // dispatch(checkUserUpdateOrCreation(updatedUser));
    }
  }, [user])

  const openEventForm = () => {
    setIsEventFormVisible(true);
  };

  const closeEventForm = () => {
    setIsEventFormVisible(false);
  };

  return (
    <>
      <Row className="mb-3 p-0 w-100 m-0">
        <MenuBar openEventForm={openEventForm} />
      </Row>
      <div className="container mb-5">
        <EventForm
          visible={isEventFormVisible}
          closeEventForm={closeEventForm}
        />
        <Pages />
      </div>
    </>
  );
}

export default App;
