import React, {Fragment, useState, useEffect} from 'react';
import EventTable from '../components/eventTable';
import Prediction from '../components/prediction';

const PredictionsContainer = ({addBet}) => {
    const bestBetsUrl = "http://localhost:3000/bestbets"
    
    const [bestBets, setBestBets] = useState([])
  
    useEffect(() => {
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(bestBetsUrl, getObj)
        .then(res => res.json())
        .then((bets) => setBestBets(bets))
        .catch(err => console.log(err))
        
    }, [])

        return (
            <Fragment>
            <EventTable headers={["Event", "Bet", "Prediction", "Delta"]}>
                {bestBets.map(bet => <Prediction key={`p-${bet.id}`} prediction={bet} addBet={addBet} />)}
            </EventTable>
            </Fragment>
        )
    }

export default PredictionsContainer;