import React, {useState, useContext} from 'react';
import { UsersContext } from '../context/usersContext';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 100,
        height: 240,
        width: 200,
        textAlign: 'center'
    },
    input: {
        margin: theme.spacing(1)
    }
}));

export default function Login (props) {
    const classes = useStyles()
    const history = useHistory()

    const usersContext = useContext(UsersContext);
    const {handleUserInfo, getFriends} = usersContext;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const baseUrl = "http://localhost:3000"
    // const baseUrl = "https://secure-chamber-07550.herokuapp.com"

    const loginUrl = `${baseUrl}/login`;

    function checkError(response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
    }
    
    const login = (user) => {
        const postObj = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({user})
        }

        return fetch(loginUrl, postObj)
                .then(checkError)
                .then(user => {
                    localStorage.setItem('token', user.jwt)
                    props.handleLogin(user.user)
                    handleUserInfo()
                    getFriends()
                })
                .catch(err => {
                    setError(true);
                })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({username, password})
            .then(() => history.push('/dashboard'))
    }

    return (
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                <form autoComplete="off" onSubmit={handleSubmit} noValidate>
                    <TextField className={classes.input} variant="outlined" name="username" type="text" label="Username" required value={username} onChange={e => setUsername(e.target.value)}/>
                    <TextField className={classes.input} variant="outlined" name="password" type="password" label="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <ButtonGroup variant="contained" color="primary">
                        <Button type="submit">Login</Button>
                        <Button onClick={props.flip}>Signup</Button>
                    </ButtonGroup>
                    {error ? <p>Username or password was incorrect.</p> : null}
                </form>
            </Paper>
        </Grid>

    );
}