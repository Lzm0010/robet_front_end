import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import EventsContainer from '../containers/eventsContainer';
import ResultsContainer from '../containers/resultsContainer';
import FriendsContainer from '../containers/friendsContainer';

export default function Dashboard () {
    const eventsUrl = "http://localhost:3000/events"
    const initialEventsState = [{
        id: null,
        start_time: null,
        league: {name: null},
        home_team: {name: null, logo:null},
        away_team: {name: null, logo:null},
        bets: []
    }]

    const [events, setEvents] = useState(initialEventsState)

    useEffect(() => {
        fetch(eventsUrl)
            .then(res => res.json())
            .then((events) => setEvents(events))
            .catch(err => console.log(err))

    }, [])

    return (
        <Grid container>
            <Grid item xs={6}>
                <EventsContainer />
            </Grid>
            
            <Grid item xs={6}>
                <ResultsContainer />
            </Grid>
                
            <Grid item xs={6}>
                <FriendsContainer />
            </Grid>
                
            <Grid item xs={6}>
                <EventsContainer events={events}/>
            </Grid>
        </Grid>
    );
}