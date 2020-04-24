import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import EventsContainer from '../containers/eventsContainer';
import ResultsContainer from '../containers/resultsContainer';
import FriendsContainer from '../containers/friendsContainer';
import PredictionsContainer from '../containers/predictionsContainer'

export default function Dashboard (props) {
    const createTicketUrl = `http://localhost:3000/tickets`

    const addBet = (bet_id) => {
        const token = localStorage.getItem('token')
        const postObj = {
            'method': 'POST',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({bet_id: bet_id, user_id: props.user.id}) 
        }
        fetch(createTicketUrl, postObj)
            .then(res => res.json())
            .then(ticket => console.log(ticket))
    }
    
    return (
        <Grid container>
            <Grid item xs={6}>
                Best Predictions
                <PredictionsContainer />
            </Grid>
            
            <Grid item xs={6}>
                My Bets
                <ResultsContainer />
            </Grid>
                
            <Grid item xs={6}>
                Friends Bets
                <FriendsContainer />
            </Grid>
                
            <Grid item xs={6}>
                All Games
                <EventsContainer addBet={addBet}/>
            </Grid>
        </Grid>
    );
}