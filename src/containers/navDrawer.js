import React, {Fragment, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Profile from '../pages/profile';
import PredictaBot from '../pages/predictaBot';
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
      width: "100%",
    }
  }));

function NavDrawer({user, logOut}) {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
    right: false,
    bottom: false,
    top: false,
  });
  const [value, setValue] = useState(0);

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

  const section = (Component) => (
    <div
      className={clsx(classes.list, classes.profile)}
      role="presentation"
    >
      <Component user={user}/>
    </div>
  )

  const linkList = ['Profile', 'Users', 'RoBet', 'PredictaBot']
  const components = [Profile, UsersContainer, RoBetContainer, PredictaBot]
  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {['left', 'bottom', 'right', 'top'].map((anchor, index) => (
          <Fragment key={anchor}>
            <Tab onClick={toggleDrawer(anchor, true, index)} aria-label={linkList[index]} label={linkList[index]}/>
              <Drawer anchor={anchor} open={state[anchor]}>
                <ClickAwayListener onClickAway={toggleDrawer(anchor, false, index)}>
                  {section(components[index])}
                </ClickAwayListener>
              </Drawer>
          </Fragment>
        ))}
        <Tab onClick={logOut} aria-label="logout" label="Logout"/>
      </Tabs>
    </Paper>
  )

}

export default NavDrawer;