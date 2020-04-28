import React, {Fragment} from 'react';
// import UserStats from '../components/userStats';
import EventTable from '../components/eventTable';
import Result from '../components/result';

export default function ResultsContainer ({userBets, user}) {
    

    return (
        <Fragment>
            <EventTable headers={["Event", "Bet", "Line/Odds", "Result", "Amount"]}>
                {userBets.map(result => <Result key={`result-${result.id}`} result={result} ticketId={result.tickets.find(ticket => ticket.user_id === user.id).id}/> )}
            </EventTable>
        </Fragment>
    )
}