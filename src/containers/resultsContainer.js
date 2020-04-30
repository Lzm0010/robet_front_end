import React, {Fragment} from 'react';
// import UserStats from '../components/userStats';
import EventTable from '../components/eventTable';
import Result from '../components/result';

export default function ResultsContainer ({userBets, user, handleBalance, deleteTicket}) {
    

    return (
        <Fragment>
            <EventTable headers={["Event", "Bet", "Line/Odds", "Result", "Amount", "Return", "Remove Ticket"]}>
                {userBets.map(result => <Result key={`result-${result.id}`} result={result} ticketId={result.tickets.find(ticket => ticket.user_id === user.id).id} handleBalance={handleBalance} deleteTicket={deleteTicket}/> )}
            </EventTable>
        </Fragment>
    )
}