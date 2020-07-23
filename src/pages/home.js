import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import '../App.css';

const useStyles = makeStyles({
    wrapper: {
        textAlign: "center",

    },
    button: {
        position: "absolute",
        top: "0%",
        left: "0%",
        width: 1000,
        height: 1000
    }
});

export default function Home () {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = () => {
        history.push('/login')
    }

    return (
        <Fragment>
            <div className="home" onClick={handleClick}>
            <div className={classes.wrapper}>
            <h1>RoBet</h1>
            <h3>Click RoBet the RoBot to Get Started</h3>
            </div>
            </div>
        </Fragment>
    );
}