import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import UsersContainer from './containers/usersContainer';
import RobetContainer from './containers/roBetContainer';
import NavDrawer from './containers/navDrawer';

function App() {
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [balance, setBalance] = useState(userInfo.balance)

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
  }

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
  }

  const handleLogin = (user) => {
    setUser(user)
    handleUserInfo()
  };

  return (
    <Router>
    <NavDrawer/>
    <Switch>
        <Route exact path="/" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
        <Route exact path="/dashboard" render={(props) => <Dashboard {...props} user={user} handleBalance={handleBalance} handleUserInfo={handleUserInfo}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} userInfo={userInfo} balance={balance} handleBalance={handleBalance}/>} />
        <Route exact path="/users" render={(props) => <UsersContainer {...props} user={user}/>} />
        <Route exact path="/robet" render={(props) => <RobetContainer {...props}/>}/>
        <Route render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  );
}

export default App;
