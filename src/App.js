import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from './context/usersContext';
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
  const [isNavHidden, setIsNavHidden] = useState(true)


  const handleLogin = (user) => {
    setUser(user)
    setAuthed(true)
    setIsNavHidden(false)
  };


  const MainContainer = () => (
    <Fragment>
        {isNavHidden ? null : <NavDrawer/> }
        <PrivateRoute exact path="/dashboard" component={Dashboard} authed={authed} user={user} />
        <PrivateRoute exact path="/profile" component={Profile} authed={authed} />
        <PrivateRoute exact path="/users" component={UsersContainer} authed={authed} user={user} />
        <PrivateRoute exact path="/robet" component={RobetContainer} authed={authed}/>
    </Fragment>
  )
  
  return (
      <Provider>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home/>} />
            <Route exact path="/login" render={(props) => <Auth {...props} handleLogin={handleLogin}/>}/>
            <Route component={MainContainer}/>
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
