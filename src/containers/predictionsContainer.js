import React, {Fragment, useState, useEffect} from 'react';
import EventTable from '../components/eventTable';
import Prediction from '../components/prediction';

const PredictionsContainer = ({addBet}) => {
    const baseUrl = "http://localhost:3000"
    // const baseUrl = "https://secure-chamber-07550.herokuapp.com"
    const bestBetsUrl = `${baseUrl}/bestbets`;
    
    const [bestBets, setBestBets] = useState([])
  
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
        fetch(bestBetsUrl, getObj)
        .then(res => res.json())
        .then((bets) => setBestBets(bets))
        .catch(err => console.log(err))
        
        return () => abortController.abort();
    }, [])

        return (
            <Fragment>
            <EventTable headers={["Event", "Bet", "Prediction", "Delta", "Add Bet"]}>
                {bestBets.slice(0, (bestBets.length/2)).map(bet => <Prediction key={`p-${bet.id}`} prediction={bet} addBet={addBet} />)}
            </EventTable>
            </Fragment>
        )
    }

export default PredictionsContainer;