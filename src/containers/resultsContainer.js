import React, {Fragment, useState, useEffect} from 'react';
// import UserStats from '../components/userStats';
import EventTable from '../components/eventTable';
import Result from '../components/result';

export default function ResultsContainer () {
    const userBetsUrl = "http://localhost:3000/mybets/"
    
    const [userBets, setUserBets] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(userBetsUrl, getObj)
            .then(res => res.json())
            .then((user) => setUserBets(user.bets))
            .catch(err => console.log(err))

    }, [userBets])

    

    return (
        <Fragment>
            <EventTable headers={["Event", "Bet", "Line/Odds", "Result"]}>
                {userBets.map(result => <Result key={`result-${result.id}`} result={result}/> )}
            </EventTable>
        </Fragment>
    )
}