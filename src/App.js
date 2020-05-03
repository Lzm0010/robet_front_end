import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './privateRoute'
import Home from './pages/home';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import UsersContainer from './containers/usersContainer';
import RobetContainer from './containers/roBetContainer';
import NavDrawer from './containers/navDrawer';


function App() {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [balance, setBalance] = useState(userInfo.balance)
  const [isNavHidden, setIsNavHidden] = useState(true)


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
    setAuthed(true)
    setIsNavHidden(false)
  };


  const MainContainer = () => (
    <Fragment>
        {isNavHidden ? null : <NavDrawer/> }
        <PrivateRoute exact path="/dashboard" component={Dashboard} authed={authed} user={user} handleBalance={handleBalance} handleUserInfo={handleUserInfo} />
        <PrivateRoute exact path="/profile" component={Profile} authed={authed} userInfo={userInfo} balance={balance} handleBalance={handleBalance} />
        <PrivateRoute exact path="/users" component={UsersContainer} authed={authed} user={user} />
        <PrivateRoute exact path="/robet" component={RobetContainer} authed={authed}/>
    </Fragment>
  )
  
  return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home/>} />
            <Route exact path="/login" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
            <Route component={MainContainer}/>
          </Switch>
        </Router>
      </Fragment>
  );
}

export default App;
