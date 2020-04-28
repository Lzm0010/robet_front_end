import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import UsersContainer from './containers/usersContainer';
import './App.css';

function App() {
  const [user, setUser] = useState({})

  const handleLogin = (user) => {
    setUser(user)
  }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul> 
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
        <Route exact path="/dashboard" render={(props) => <Dashboard {...props} user={user}/>} />
        <Route exact path="/profile" render={() => <Profile user={user}/>} />
        <Route exact path="/users" render={(props) => <UsersContainer {...props} user={user}/>} />
        <Route render={() => <Redirect to='/' />} />
      </Switch>
    </Router>
  );
}

export default App;
