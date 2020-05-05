import React, { Fragment, useContext } from 'react';
import {UsersContext} from '../context/usersContext';
import DrawerTable from '../components/drawerTable';
import Result from '../components/result';
import UserStats from '../components/userStats';

const Profile = () => {
    const usersContext = useContext(UsersContext);
    const {userInfo, balance, handleBalance} = usersContext;

    return (
        <Fragment>
            <h2>{userInfo.username}</h2>
            <h6>Balance: $ {parseFloat(balance).toFixed(2)}</h6>
            <UserStats userInfo={userInfo}/>
            <DrawerTable headers={["Event", "Bet", "Line/Odds", "Result", "Amount Bet", "Return"]}>
                {userInfo.bets.sort((a,b) => b.event.start_time.localeCompare(a.event.start_time)).map(result => <Result key={`result-${result.id}`} result={result} ticketId={result.tickets.find(ticket => ticket.user_id === userInfo.id).id} handleBalance={handleBalance}/> )}
            </DrawerTable>
        </Fragment>
    );
}

export default Profile;