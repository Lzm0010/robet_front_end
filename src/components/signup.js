import React, {useState, useContext} from 'react';
import { UsersContext } from '../context/usersContext';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 100,
        height: 340,
        width: 200,
        textAlign: 'center'
    },
    input: {
        margin: theme.spacing(1)
    }
}));

export default function Signup (props) {
    const history = useHistory()

    const usersContext = useContext(UsersContext);
    const {handleUserInfo, getFriends} = usersContext;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const baseUrl = "http://localhost:3000"
    // const baseUrl = "https://secure-chamber-07550.herokuapp.com"
    const signupUrl = `${baseUrl}/users`;

    const signup = (user) => {
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(signupUrl, postObj)
                .then(res => res.json())
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user)
                    handleUserInfo()
                    getFriends()
                })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signup({username, email, password, passwordConfirm})
            .then(() => history.push('/dashboard'))
    }

    const classes = useStyles();

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
            <form onSubmit={handleSubmit} noValidate>
                <TextField className={classes.input} variant="outlined" name="username" type="text" label="Username" required value={username} onChange={e => setUsername(e.target.value)}/>
                <TextField className={classes.input} variant="outlined" name="email" type="email" label="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField className={classes.input} variant="outlined" name="password" type="password" label="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                <TextField className={classes.input} variant="outlined" name="passwordConf" type="password" label="Confirm Password" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                <ButtonGroup variant="contained" color="primary">
                    <Button type="submit">Signup</Button>
                    <Button onClick={props.flip}>Login</Button>
                </ButtonGroup>
            </form>
        </Paper>
        </Grid>
    );
}