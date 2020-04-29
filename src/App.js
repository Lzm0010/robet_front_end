import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import UsersContainer from './containers/usersContainer';
import RobetContainer from './containers/roBetContainer';
import Navbar from './containers/navbar';

function App() {
  const [user, setUser] = useState({})

  const userInfoUrl = "http://localhost:3000/mybets/"
  const [userInfo, setUserInfo] = useState({})

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
      
      fetch(userInfoUrl, getObj)
          .then(res => res.json())
          .then(user => setUserInfo(user))
          .catch(err => console.log(err))

      return () => abortController.abort();
  }, [])

  const handleLogin = (user) => {
    setUser(user)
  };

  return (
    <Router>
    <Navbar />
    <Switch>
        <Route exact path="/" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
        <Route exact path="/dashboard" render={(props) => <Dashboard {...props} user={user}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} userInfo={userInfo} />} />
        <Route exact path="/users" render={(props) => <UsersContainer {...props} user={user}/>} />
        <Route exact path="/robet" render={(props) => <RobetContainer {...props}/>}/>
        <Route render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  );
}

export default App;
