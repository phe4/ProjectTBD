import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from 'react-router-dom';
import { signInWithGoogle } from '../redux/actions/authActions';
import { firebaseSignOut } from '../utilities/firebase';
import { signOutAuth } from '../redux/slices/authSlice';
import { logOutUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { Image, Button } from "react-bootstrap";

const MenuBar = ({ openEventForm }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const signOut = () => {
    dispatch(signOutAuth());
    dispatch(logOutUser());
    firebaseSignOut();
  }

  const signIn = () => {
    const registrationToken = new URLSearchParams(window.location.search).get('token');
    dispatch(signInWithGoogle({registrationToken}));
  }

  const SignInButton = () => (
    <button
      className="ml-5 p-2 w-15 btn btn-primary"
      style={{
        border: "2px solid white",
        color: "white",
      }}
      onClick={signIn}
    >
      Sign in
    </button>
  );
  const SignOutButton = () => (
    <button
      className="ml-5 p-2 w-10 btn btn-primary"
      style={{
        border: "2px solid white",
        color: "white",
      }}
      onClick={signOut}
    >
      Sign out
    </button>
  );

  return (
    <Navbar className="p-3" style={{ backgroundColor: "#1E90FF", maxHeight: "76px", minWidth: "390px" }}>
      <Container>
        <Link to="/" className="navbar-brand" style={{ color: "white", fontWeight: "bold", fontSize: "1.4rem" }}>
          Join!
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {user.user && user.user.role !== "user" && (
            <Nav className="me-auto">
              <Nav.Link
                href="#"
                onClick={openEventForm}
                style={{ color: "white" }}
              >
                Create Event
              </Nav.Link>
            </Nav>
        )}
        </Navbar.Collapse>
        {user.user && !location.pathname.includes("/profile") && (
          <Nav className="me-auto">
             <Link 
                to={`/profile`} 
                style={{ marginRight: "10px", padding: '0px', borderRadius: '50%', border: '1px solid white', position: 'relative', display: 'block' }}
              >
                <Image src={user.user?.photoURL} roundedCircle style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="" />
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'red',
                  border: '2px solid white', 
                  borderRadius: '50%',
                }}></span>
              </Link>

          </Nav>
        )
        }
        {user.user && location.pathname.includes("/profile") && (
          <Nav className="me-auto px-3">
            <Link
              to={`/notifications/`}
              className="nav-link bi bi-bell-fill rounded-3"
              style={{
                color: "white",
                backgroundColor: "rgb(0, 191, 255)",
                display: "flex",
              }}
            ></Link>
          </Nav>
        )}

        {user.user ? <SignOutButton /> : <SignInButton />}
      </Container>
    </Navbar>
  );
};

export default React.memo(MenuBar);
