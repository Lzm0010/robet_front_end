import React, {Fragment, useState, useEffect, useContext} from 'react';
import {UsersContext} from '../context/usersContext';
import User from '../components/user';
import EventTable from '../components/eventTable';

const UsersContainer = (props) => {
    const usersContext = useContext(UsersContext);
    const {userInfo, followUser, unFollowUser} = usersContext;
    
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const usersUrl = "http://localhost:3000/users"
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
        fetch(usersUrl, getObj)
            .then(res => res.json())
            .then((users) => setUsers(users))
            .catch(err => console.log(err))

        return () => abortController.abort();
    }, [])
    
    return (
        <Fragment>
            <EventTable headers={["Username", "Follow/Unfollow"]}>
                {users.map(user => <User key={`user-${user.id}`}  currentUser={userInfo} user={user} followUser={followUser} unFollowUser={unFollowUser}/> )}
            </EventTable>
        </Fragment>
    )
}

export default UsersContainer;