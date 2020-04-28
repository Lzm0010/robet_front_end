import React, {Fragment, useState, useEffect} from 'react';
import EventTable from '../components/eventTable';
import Friend from '../components/friend';


const FriendsContainer = () => {
    const myFriendsUrl = "http://localhost:3000/myfriends"
    
    const [friends, setFriends] = useState([])
  
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
        fetch(myFriendsUrl, getObj)
        .then(res => res.json())
        .then((friends) => setFriends(friends))
        .catch(err => console.log(err))
        
        return () => abortController.abort();
    }, [])

        return (
            <Fragment>
            <EventTable headers={["Ranking", "Username", "Wins", "Losses", "Ties", "More Details"]}>
                {friends.map(friend => <Friend key={`f-${friend.id}`} friend={friend} />)}
            </EventTable>
            </Fragment>
        )
    }

export default FriendsContainer;