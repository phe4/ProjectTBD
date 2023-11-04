import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../redux/actions/dataActions";
import { Form } from "react-bootstrap";

export const useFormData = (values = {}) => {
  const [state, setState] = useState(() => ({ values }));
  const change = (evt) => {
    if(evt.target) {
      const { id, value } = evt.target;
      if (id === "datetime") {
        // parse the datetime value
        var date = new Date(value);
        date = new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(date);
        console.log(date);
        setState((prevState) => ({
          ...prevState.values,
          values: { ...prevState.values, [id]: date },
        }));
      } else {
        setState((prevState) => ({
          ...prevState.values,
          values: { ...prevState.values, [id]: value },
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState.values,
        values: { ...prevState.values, ...evt },
      }));
    }
  };
  return [state, change];
};

const InputField = ({ name, text, state, change, type }) => (
  <Form.Group as={Col} className="mb-3" controlId={name}>
    <Form.Label>{text}</Form.Label>
    <Form.Control 
      type={type}
      value={state.values?.[name] || ''}
      onChange={change}
      minLength="3"
      maxLength={name === "title" ? "50" : "400"}
      required
    />
  </Form.Group>
);

const InputDatetimeField = ({ name, state, change }) => (
  <Form.Group className="mb-3" controlId={name}>
  <Form.Label>Pick time</Form.Label>
  <Form.Control 
    type="datetime-local"
    // value={state.values?.[name] || ''}
    onChange={change}
    required
  />
</Form.Group>
);

const SportDropdown = ({ name, state, text, change }) => (
  <Form.Group className="mb-3" controlId={name}>
    <Form.Label>{text}</Form.Label>
    <Form.Control as="select" required onChange={change} value={state.values?.[name] || ''}>
      <option value="" disabled>Select the sport you want to play</option>
      <option value="Basketball">Basketball</option>
      <option value="Soccer">Soccer</option>
      <option value="Football">Football</option>
      <option value="Tennis">Tennis</option>
      <option value="Frisby">Frisby</option>
    </Form.Control>
  </Form.Group>
);

const UserLevelDropdown = ({ name, state, text, change }) => (
  <Form.Group as={Col} className="mb-3" controlId={name}>
    <Form.Label>{text}</Form.Label>
    <Form.Control as="select" required onChange={change} value={state.values?.[name] || ''}>
      <option value="" disabled>student level</option>
      <option value="1">Beginner</option>
      <option value="2">Intermediate</option>
      <option value="3">Advanced</option>
    </Form.Control>
  </Form.Group>
);

const EventForm = ({ isVisible, closeEventForm }) => {
  const [state, change] = useFormData({ datetime: new Date() });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const [isMapModalVisible, setIsMapModalVisible] = useState(false);


  const autocompleteInputRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      const pacContainers = document.querySelectorAll('.pac-container');
      pacContainers.forEach(container => {
        container.parentNode.removeChild(container);
      });
      return;
    }
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
    console.log("mounting");
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      options,
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      console.log(place.geometry.location.lat(), place.geometry.location.lng());
      handlePlaceSelected(place, autocomplete);
    });
    return () => {
      // Cleanup event listener on component unmount
      console.log("unmounting");
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isVisible]);




  const handlePlaceSelected = (place, autocomplete) => {
    // Update location and latLng with change event
    const location = place.formatted_address;
    const latLng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    change({ location, latLng });
  };

  // const openMapModal = () => {
  //   setIsMapModalVisible(true);
  // };
  // const closeMapModal = () => {
  //   setIsMapModalVisible(false);
  // };

  const addEvent = (event) => {
    console.log(event);
    dispatch(createEvent(event));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if ( user !== null) {
        addEvent({
          ...state.values,
          datetime: state.values.datetime.toString(),
          attendees: [],
          host: user.id,
        });
      } else {
        // TODO: show error message
        alert("You need to login to create an event");
      }
      closeEventForm();
    }
  };

  return (
    <Modal
      show={isVisible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Create Event</h4>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} >
      <Modal.Body>
        
        <div className="container pt-3">
          
            <InputField
              name="title"
              text="Title"
              state={state}
              change={change}
              type="text"
            />
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={state.values?.description || ''}
                onChange={change}
                minLength="10"
                maxLength="400"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                ref={autocompleteInputRef}
                type="text"
                required
                minLength="5"
              />
            </Form.Group>
            <InputDatetimeField
              name="datetime"
              state={state}
              change={change}
            />
            <Row className="mb-3">
              <InputField
                name="capacity"
                text="Capacity"
                state={state}
                change={change}
                type="number"
              />
              
              <UserLevelDropdown
                name="userLevel"
                text="User level"
                state={state}
                change={change}
              />

              <Form.Group as={Col} className="mb-3 " controlId="vip">
                <Form.Label>VIP</Form.Label>
                <Form.Check 
                  type="switch"
                  onChange={change}
                />
              </Form.Group>
            </Row>
            <SportDropdown
              name="topic"
              text="Topic"
              state={state}
              change={change}
            />
          
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeEventForm}>Close</Button>
        <Button type="submit">
          Submit
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

const MemoizedEventForm = React.memo(EventForm);

export default MemoizedEventForm;
