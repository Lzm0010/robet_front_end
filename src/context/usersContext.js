import React, {createContext, useState, useEffect} from 'react';
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

    const handleUserInfo = () => {
        const userInfoUrl = "http://localhost:3000/mybets/"
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
          const editUserUrl = `http://localhost:3000/users/${userInfo.id}`
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

      useEffect(() => {
          handleUserInfo()
      }, [])

      //make the context object
      const usersContext = {
          userInfo,
          setUserInfo,
          balance,
          setBalance,
          handleUserInfo,
          handleBalance
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