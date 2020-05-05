import React, {Fragment, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import Profile from '../pages/profile';
import UsersContainer from '../containers/usersContainer';
import RoBetContainer from '../containers/roBetContainer';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    profile: {
      width: 700,
    }
  }));

function NavDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
    right: false,
    bottom: false,
  });
  const [value, setValue] = useState(0);

  const logOut = () => {
    window.localStorage.clear()
    window.location.href = "/login" 
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDrawer = (anchor, open, index) => (event) => {
      if (event.type ==="keydown" && (event.key === 'Tab' || event.key === 'Shift')){
          return;
      }
      setState({...state, [anchor]: open});
      handleChange(event,index)
  }

  const section = (anchor, Component) => (
    <div
      className={clsx(classes.list, classes.profile)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Component/>
    </div>
  )

  const linkList = ['Profile', 'Users', 'RoBet']
  const components = [Profile, UsersContainer, RoBetContainer]
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {['left', 'bottom', 'right'].map((anchor, index) => (
          <Fragment key={anchor}>
            <Tab onClick={toggleDrawer(anchor, true, index)} aria-label={linkList[index]} label={linkList[index]}/>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {section(anchor, components[index])}
            </Drawer>
          </Fragment>
        ))}
        <Tab onClick={logOut} aria-label="logout" label="Logout"/>
      </Tabs>
    </Paper>
  )

}

export default NavDrawer;