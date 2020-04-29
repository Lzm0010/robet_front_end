import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import EventsContainer from '../containers/eventsContainer';
import ResultsContainer from '../containers/resultsContainer';
import FriendsContainer from '../containers/friendsContainer';
import PredictionsContainer from '../containers/predictionsContainer'

export default function Dashboard (props) {
    const createTicketUrl = `http://localhost:3000/tickets`
    
    const userBetsUrl = "http://localhost:3000/mybets/"
    
    const [userBets, setUserBets] = useState([]);

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
        fetch(userBetsUrl, getObj)
            .then(res => res.json())
            .then(user => setUserBets(user.bets))
            .catch(err => console.log(err))

        return () => abortController.abort();
    }, [])

    const addBet = (bet_id) => {
        const token = localStorage.getItem('token')
        const postObj = {
            'method': 'POST',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({bet_id: bet_id, user_id: props.user.id, amount: 0}) 
        }
        fetch(createTicketUrl, postObj)
            .then(res => res.json())
            .then(ticket => setUserBets([...userBets, ticket.bet]))
    }
    
    return (
        <Grid container>
            <Grid item xs={6}>
                Best Predictions
                <PredictionsContainer addBet={addBet}/>
            </Grid>
            
            <Grid item xs={6}>
                My Bets
                <ResultsContainer userBets={userBets} user={props.user}/>
            </Grid>
                
            <Grid item xs={6}>
                Friends Records
                <FriendsContainer />
            </Grid>
                
            <Grid item xs={6}>
                All Games
                <EventsContainer addBet={addBet}/>
            </Grid>
        </Grid>
    );
}