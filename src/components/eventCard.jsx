import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import EventDetailsModal from "../eventDetails/eventDetails";

const EventCard = ({ event, user, eventId }) => {
  const [isEventDetailsModalVisible, setIsEventDetailsModalVisible] =
    useState(false);
  const openEventDetailsModal = () => {
    setIsEventDetailsModalVisible(true);
  };
  const closeEventDetailsModal = () => {
    setIsEventDetailsModalVisible(false);
  };
  const isEventAtCapacity = event.size === event.cap;
  const isCurrentUserInEvent = user !== null && event.attendees&& event.attendees.includes(user.uid);
  const isCurrentUserOrganizer = user !== null && event.host === user.uid;
  // const cardwidth = window.location.pathname === "/" ? "19rem" : "";
  const bt2text = isCurrentUserInEvent
    ? isCurrentUserOrganizer
      ? " Discard"
      : " Unjoin"
    : " Join";
  const bt2icon = isCurrentUserInEvent
    ? isCurrentUserOrganizer
      ? "bi bi-trash3-fill"
      : "bi bi-box-arrow-right"
    : "bi bi-box-arrow-in-left";

  return (
    <div>
      {/* <EventDetailsModal
        event={event}
        users={users}
        isVisible={isEventDetailsModalVisible}
        closeEventDetailsModal={closeEventDetailsModal}
      /> */}
      <Card className="mx-1 my-2 custom-card-sm custom-card-lg">
        <Card.Header>
          <Card.Title>{event.title}</Card.Title>
        </Card.Header>
        <Card.Body style={{ height: "10rem" }}>
          <Card.Text className="overflow-hidden">
            {event.description}
          </Card.Text>
          <Card.Text>Date & Time: {event.datetime}</Card.Text>
          <Card.Text>
            Capacity: {event.capacity}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button
            className="bi bi-people-fill"
            variant="primary"
            onClick={() => {
              openEventDetailsModal();
            }}
          >
            <p className="d-inline"> See attendees</p>
          </Button>
          {user !== null && (
            <Button
              className={bt2icon}
              variant={`${
                isCurrentUserInEvent
                  ? isCurrentUserOrganizer
                    ? "danger"
                    : "danger"
                  : "primary"
              }`}
              disabled={isEventAtCapacity}
              onClick={() => {
                // toggleEvent(event, eventId, isCurrentUserOrganizer);
                console.log("eventCard: ", event);
              }}
            >
              <p className="d-inline">{bt2text}</p>
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EventCard;
