import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EventsContainer from '../containers/eventsContainer';
import ResultsContainer from '../containers/resultsContainer';
import FriendsContainer from '../containers/friendsContainer';
import PredictionsContainer from '../containers/predictionsContainer'

const useStyles = makeStyles({
    headings: {
        textAlign: "center"
    }
})

export default function Dashboard (props) {
    console.log(props)
    const classes = useStyles()
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
            .then(ticket => {
                setUserBets([...userBets, ticket.bet])
                props.handleUserInfo()
            })
    }

    const deleteTicket = (ticketId) => {
        const delTicketUrl = `http://localhost:3000/tickets/${ticketId}`
        const token = localStorage.getItem('token')
        const delObj = {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        fetch(delTicketUrl, delObj)
            .then(res => res.json())
            .then(() => {
                const filteredArray = userBets.filter(bet => {
                    return bet.tickets.find(ticket => ticket.user_id === props.user.id).id !== ticketId
                })
                setUserBets(filteredArray)
                props.handleUserInfo()
            })
    }
    
    return (
        <Grid container>
            <Grid item xs={6}>
                <h6 className={classes.headings}>RoBet's Best Picks</h6>
                <PredictionsContainer addBet={addBet}/>
            </Grid>
            
            <Grid item xs={6}>
                <h6 className={classes.headings}>My Bets</h6>
                <ResultsContainer userBets={userBets} user={props.user} handleBalance={props.handleBalance} deleteTicket={deleteTicket}/>
            </Grid>
                
            <Grid item xs={6}>
                <h6 className={classes.headings}>Friend's Performance</h6>
                <FriendsContainer />
            </Grid>
                
            <Grid item xs={6}>
                <h6 className={classes.headings}>Today's Games</h6>
                <EventsContainer addBet={addBet}/>
            </Grid>
        </Grid>
    );
}