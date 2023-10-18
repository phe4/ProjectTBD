import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const useFormData = (values = {}) => {
  const [state, setState] = useState(() => ({ values }));
  const change = (evt) => {
    const { id, value } = evt.target;
    if (id === "datetime") {
      // parse the datetime value
      var date = new Date(value);
      date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
      const newValues = { ...state.values, [id]: date.replace(",", " @") };
      setState({ values: newValues });
    } else {
      const values = { ...state.values, [id]: value };
      setState({ values });
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

const EventForm = ({ isVisible, closeEventForm, addEvent }) => {
  const [state, change] = useFormData({ datetime: new Date() });
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
            <InputField
              name="location"
              text="Location"
              state={state}
              change={change}
            />
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
              name="sport"
              text="Sport"
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

export default EventForm;
