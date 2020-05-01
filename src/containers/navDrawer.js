import React, {Fragment, useState} from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    menuButton: {
      marginRight: theme.spacing(1),
    }
  }));

function NavDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
      if (event.type ==="keydown" && (event.key === 'Tab' || event.key === 'Shift')){
          return;
      }
      setState({...state, [anchor]: open});
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Dashboard', 'Profile', 'RoBet', 'Users'].map((text) => (
          <ListItem button key={text}>
            <NavLink to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text}/> 
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
      <Fragment>
          <IconButton onClick={toggleDrawer('left', true)} className={classes.menuButton} aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
      </Fragment>
  )

}

export default NavDrawer;