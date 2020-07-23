import React, {createContext, useState} from 'react';
import PropTypes from "prop-types";

export const UsersContext = createContext({});

export const Provider = props => {
    //initial values obtained from props
    const {
        userInfo: initialUserInfo,
        balance: initialBalance,
        children
    } = props;

    //state to keep the values
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [balance, setBalance] = useState(initialBalance);
    const [friends, setFriends] = useState([]);

    const baseUrl = "http://localhost:3000"
    // const baseUrl = "https://secure-chamber-07550.herokuapp.com"
    

    const handleUserInfo = () => {
        const userInfoUrl = `${baseUrl}/mybets/`
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        
        fetch(userInfoUrl, getObj)
            .then(res => res.json())
            .then(user => {
              setUserInfo(user)
              setBalance(user.balance)
            })
            .catch(err => console.log(err))
      };
    
    const handleBalance = (money) => {
        const editUserUrl = `${baseUrl}/users/${userInfo.id}`
        const token = localStorage.getItem('token')
        const userObj = {
            'method': 'PATCH',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({balance: parseFloat(balance) + parseFloat(money)}) 
        }
        fetch(editUserUrl, userObj)
            .then(res => res.json())
            .then(user => {
            setBalance(user.balance)
            setUserInfo(user)
            })
    };

    const getFriends = () => {
        const myFriendsUrl = `${baseUrl}/myfriends`
        const token = localStorage.getItem('token')
        const getObj = {
            'method': 'GET',
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch(myFriendsUrl, getObj)
        .then(res => res.json())
        .then((friends) => setFriends(friends))
        .catch(err => console.log(err))
    };

    const followUser = (userId) => {
    const createRshipUrl = `${baseUrl}/relationships`
    const token = localStorage.getItem('token')
    const postObj = {
        'method': 'POST',
        'headers': {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify({follower_id: userInfo.id, followed_id: userId}) 
    }
    fetch(createRshipUrl, postObj)
        .then(res => res.json())
        .then(friend => {
            setFriends([...friends, friend])
            handleUserInfo()}
        )
    }

    const unFollowUser = (relationshipId) => {
        const delRshipUrl = `${baseUrl}/relationships/${relationshipId}`
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
            .then(bye_friend => {
                const filteredArray = friends.filter(friend => friend.id !== bye_friend.id)
                setFriends(filteredArray)
                handleUserInfo()
            })
    }

    // const handleAmount = (event, ticketId) => {
    //     event.preventDefault()
    //     const editTicketUrl = `http://localhost:3000/tickets/${ticketId}`
    //     const token = localStorage.getItem('token')
    //     const ticketObj = {
    //         'method': 'PATCH',
    //         'headers': {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         'body': JSON.stringify({amount:amount}) 
    //     }
        
    //     fetch(editTicketUrl, ticketObj)
    //         .then(res => res.json())
    //         .then(ticket => {
    //             setAmount(ticket.amount)
    //             if (ticket.bet.event.status === "finished") {
    //                 handleBalance(parseFloat(ticket.return) - parseFloat(betReturn))
    //             } 
    //             setBetReturn(ticket.return)
    //         })

    // }

    //make the context object
    const usersContext = {
        userInfo,
        setUserInfo,
        balance,
        setBalance,
        friends,
        setFriends,
        getFriends,
        handleUserInfo,
        handleBalance,
        followUser,
        unFollowUser
    };
    
    return <UsersContext.Provider value={usersContext}>{children}</UsersContext.Provider>
};

export const {Consumer} = UsersContext;

Provider.propTypes = {
    userInfo: PropTypes.object,
    balance: PropTypes.number
};

Provider.defaultProps = {
    userInfo: {},
    balance: 0
};