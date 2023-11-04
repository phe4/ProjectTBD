import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/actions/dataActions';
import FilterSearch from '../../components/filterSearch';
import EventCard from '../../components/eventCard';
// import ConfirmModal from '../../components/confirmModal';
import { Container, Row } from 'react-bootstrap';

const UserPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.data.events);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    // Define initial parameters
    const params = {
      filter: null, // or your desired filter
      searchText: '',
      pageSize: 10,
      pageNumber: 1
    };
    console.log("fetchEvents: ", params);

    dispatch(fetchEvents(params));
  }, [dispatch]);

  return (
    <Container fluid="true">
      <Row className="pb-3">
        <FilterSearch />
      </Row>
      <Row className='justify-content-center'>
        <Container style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(events)
            .map(([eventId, event]) => (
              <EventCard
                key={eventId}
                event={event} 
                user={user}
                eventId={eventId}
              />
            ))}
          {/* <ConfirmModal
            del={deleteEvent}
            showModal={isConfirmModalVisible}
            hide={() => setIsConfirmModalVisible(false)}
          /> */}
        </Container>
      </Row>
    </Container>
  );
};

export default UserPage;