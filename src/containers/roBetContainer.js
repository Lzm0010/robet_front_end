import React, {Fragment, useState, useEffect} from 'react';
import EventTable from '../components/eventTable';
import RobetResult from '../components/robetResult';
import { TableRow, TableCell } from '@material-ui/core';

const RoBetContainer = () => {
    const betsUrl = "http://localhost:3000/robetbets"
    
    const [roBets, setRoBets] = useState([])
  
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
        fetch(betsUrl, getObj)
        .then(res => res.json())
        .then((bets) => setRoBets(bets))
        .catch(err => console.log(err))
        
        return () => abortController.abort();
    }, [])

        return (
            <Fragment>
                <h2>RoBet's Bets</h2>
                
                {roBets[0] !== undefined ? (
                    <h4>Record: {roBets[0].prediction.robet_record.wins} - {roBets[0].prediction.robet_record.losses} - {roBets[0].prediction.robet_record.ties}</h4> ):(
                    <div>Fetching Robet's Record</div>
                    )
                }
                <EventTable headers={["Event", "Bet", "Prediction", "Delta", "Result"]}>
                    {roBets !== undefined ? (
                        roBets.map(bet => <RobetResult key={`rb-${bet.id}`} prediction={bet} />)
                        ) : (
                            <TableRow>
                                <TableCell>
                                    Getting Robet's Bets
                                </TableCell>
                            </TableRow>
                        )}
                </EventTable>
            </Fragment>
        )
    }

export default RoBetContainer;