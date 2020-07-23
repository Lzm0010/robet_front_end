import React, {Fragment, useState, useEffect} from 'react';
import Event from '../components/event';
import EventTable from '../components/eventTable';


const EventsContainer = ({addBet}) => {
  const baseUrl = "http://localhost:3000"
    // const baseUrl = "https://secure-chamber-07550.herokuapp.com"
  const eventsUrl = `${baseUrl}/events`
    
  const [events, setEvents] = useState([])
  
  useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      const token = localStorage.getItem('token')
      const getObj = {
          'method': 'GET',
          'headers': {
              'Authorization': `Bearer ${token}`
          },
          'signal': signal
      }
      fetch(eventsUrl, getObj)
      .then(res => res.json())
      .then((events) => setEvents(events))
      .catch(err => console.log(err))
      
      return () => abortController.abort();
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