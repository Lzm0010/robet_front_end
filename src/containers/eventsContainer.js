import React, {Fragment, useState, useEffect} from 'react';
import Event from '../components/event';
import EventTable from '../components/eventTable';


const EventsContainer = ({addBet}) => {
  const eventsUrl = "http://localhost:3000/events"
    
  const [events, setEvents] = useState([])
  
  useEffect(() => {
      const token = localStorage.getItem('token')
      const getObj = {
          'method': 'GET',
          'headers': {
              'Authorization': `Bearer ${token}`
          }
      }
      fetch(eventsUrl, getObj)
      .then(res => res.json())
      .then((events) => setEvents(events))
      .catch(err => console.log(err))
      
  }, [])

    return (
        <Fragment>
          <EventTable headers={["Event", "Moneyline", "Total", "Spread"]}>
            {events.map(event => <Event key={`event-${event.id}`} event={event} addBet={addBet} />)}
          </EventTable>
        </Fragment>
    )
}

export default EventsContainer;