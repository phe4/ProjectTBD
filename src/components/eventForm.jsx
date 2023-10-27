import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { createEvent } from "../redux/actions/dataActions";
// import MapLocation from "./mapLocationPicker";

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

const InputField = ({ name, text, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    />
  </div>
);

const InputDatetimeField = ({ name, state, change }) => (
  <div>
    <label htmlFor={name} className="form-label">
      Pick time
    </label>
    <input
      type="datetime-local"
      className="form-control mb-3"
      id={name}
      name={name}
      onChange={change}
    ></input>
  </div>
  // <DatePicker
  //     selected={state.values.datetime}
  //     onChange={(date) => {
  //         change({ target: { id: name, value: date } })
  //     }}
  //     showTimeSelect
  //     dateFormat="Pp"
  // />
);

const SportDropdown = ({ name, text, change }) => (
  <div>
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <Form.Select id={name} onChange={change}>
      <option>Select the sport you want to play</option>
      <option value="Basketball">Basketball</option>
      <option value="Soccer">Soccer</option>
      <option value="Football">Football</option>
      <option value="Tennis">Tennis</option>
      <option value="Frisby">Frisby</option>
    </Form.Select>
  </div>
);

const EventForm = ({ isVisible, closeEventForm }) => {
  const [state, change] = useFormData({ datetime: new Date() });
  const dispatch = useDispatch();
  // const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  // const [location, setLocation] = useState("");


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
    // console.log('Selected place:', place);
    // Update location and latLng with change event
    const location = place.formatted_address;
    const latLng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    change({ location, latLng });
    // window.google.maps.event.clearInstanceListeners(autocomplete);
  };

  // const openMapModal = () => {
  //   setIsMapModalVisible(true);
  // };
  // const closeMapModal = () => {
  //   setIsMapModalVisible(false);
  // };

  const addEvent = (event) => {
    console.log(event);
    // dispatch(createEvent(event));
  };

  const InputLocation = ({ name, text, state, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      {/* <MapLocation
      onPlaceSelected={handlePlaceSelected}
      change={setLocation}
      /> */}
      {/* <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
    /> */}
    </div>
  );

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
      <Modal.Body>
        <div className="container pt-3">
          <form>
            <InputField
              name="title"
              text="Title"
              state={state}
              change={change}
            />
            <InputField
              name="description"
              text="Description"
              state={state}
              change={change}
            />
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                ref={autocompleteInputRef}
                className="form-control"
                id="location"
                name="location"
                // onChange={change}
              />
            </div>
            <InputDatetimeField
              name="datetime"
              text="Datetime"
              state={state}
              change={change}
            />
            <InputField
              name="cap"
              text="Capacity"
              state={state}
              change={change}
            />
            <SportDropdown
              name="Topic"
              text="Topic"
              state={state}
              change={change}
            />
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeEventForm}>Close</Button>
        <Button
          onClick={() => {
            addEvent({
              ...state.values,
              datetime: state.values.datetime.toString(),
            });
            closeEventForm();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const MemoizedEventForm = React.memo(EventForm);

export default MemoizedEventForm;
