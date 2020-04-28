import React, {Fragment, useState, useEffect} from 'react';
import User from '../components/user';
import EventTable from '../components/eventTable';

const UsersContainer = (props) => {
    const usersUrl = "http://localhost:3000/users"
    const createRshipUrl = `http://localhost:3000/relationships`

    const [users, setUsers] = useState([])

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
        fetch(usersUrl, getObj)
            .then(res => res.json())
            .then((users) => setUsers(users))
            .catch(err => console.log(err))

        return () => abortController.abort();
    }, [])


    const followUser = (userId) => {
        const token = localStorage.getItem('token')
        const postObj = {
            'method': 'POST',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({follower_id:props.user.id, followed_id: userId}) 
        }
        fetch(createRshipUrl, postObj)
            .then(res => res.json())
            .then(relationship => console.log(relationship))
    }

    const unFollowUser = (relationshipId) => {
        const delRshipUrl = `http://localhost:3000/relationships/${relationshipId}`
        const token = localStorage.getItem('token')
        const delObj = {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            } 
        }
        fetch(delRshipUrl, delObj)
            .then(res => res.json())
            .then(relationship => console.log(relationship))
    }
    
    return (
        <Fragment>
            <EventTable headers={["Username", "Follow/Unfollow"]}>
                {users.map(user => <User key={`user-${user.id}`} user={user} followUser={followUser} unFollowUser={unFollowUser}/> )}
            </EventTable>
        </Fragment>
    )
}

export default UsersContainer;