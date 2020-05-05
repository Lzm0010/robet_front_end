import React, {Fragment, useContext} from 'react';
import {UsersContext} from '../context/usersContext';
import EventTable from '../components/eventTable';
import Friend from '../components/friend';


const FriendsContainer = () => {
    const usersContext = useContext(UsersContext);
    const {friends} = usersContext;
    
    return (
        <Fragment>
        <EventTable headers={["Ranking", "Username", "Wins", "Losses", "Ties", "More Details"]}>
            {friends.map(friend => <Friend key={`f-${friend.id}`} friend={friend} />)}
        </EventTable>
        </Fragment>
    )
}

export default FriendsContainer;