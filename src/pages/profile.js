import React, { Fragment } from 'react';
import EventTable from '../components/eventTable';
import Result from '../components/result';
import UserStats from '../components/userStats';

const Profile = ({userInfo, balance, handleBalance}) => {
    
    return (
        <Fragment>
            <h2>{userInfo.username}</h2>
            <h6>Balance: $ {parseFloat(balance).toFixed(2)}</h6>
            <UserStats userInfo={userInfo}/>
            <EventTable headers={["Event", "Bet", "Line/Odds", "Result", "Amount Bet", "Return"]}>
                {userInfo.bets.map(result => <Result key={`result-${result.id}`} result={result} ticketId={result.tickets.find(ticket => ticket.user_id === userInfo.id).id} handleBalance={handleBalance}/> )}
            </EventTable>
        </Fragment>
    );
}

export default Profile;