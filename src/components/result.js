import React, {Fragment, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    win: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    push: {
        color: 'grey'
    }
})


export default function Result ({result, ticketId, handleBalance}) {
    const [amount, setAmount] = useState(result.tickets.find(ticket=> ticket.id === ticketId).amount)
    const [betReturn, setBetReturn] = useState(result.tickets.find(ticket=> ticket.id === ticketId).return)
    const classes = useStyles()
    
    const handleAmount = (event) => {
        event.preventDefault()
        const editTicketUrl = `http://localhost:3000/tickets/${ticketId}`
        const token = localStorage.getItem('token')
        const ticketObj = {
            'method': 'PATCH',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({amount:amount}) 
        }
        
        fetch(editTicketUrl, ticketObj)
            .then(res => res.json())
            .then(ticket => {
                setAmount(ticket.amount)
                handleBalance(parseFloat(ticket.return) - parseFloat(betReturn))
                setBetReturn(ticket.return)
            })

    }

    const renderSwitch = (param) => {
        switch(param) {
            case 'Win':
                return <span className={classes.win}>W </span>;
            case "Loss":
                return <span className={classes.loss}>L </span>;
            case "Push":
                return <span className={classes.push}>P </span>;
            default:
                return null;
        }
    }

    return (
        <Fragment>
        {result !== undefined ? (
            <TableRow>
                <TableCell component="th" scope="row">
                    {result.event.away_team.name} @ {result.event.home_team.name}
                </TableCell>
                <TableCell>
                    {result.bet_type} - {result.position}
                </TableCell>
                <TableCell>
                    {result.line} | {result.odds}
                </TableCell>
                <TableCell>
                    {renderSwitch(result.outcome)}
                    {result.event.away_score} - {result.event.home_score}
                </TableCell>
                <TableCell>
                    <form onSubmit={e => handleAmount(e)}>
                        <input type="number" name="amount" required placeholder={result.tickets.find(ticket=> ticket.id === ticketId).amount} value={amount} onChange={e => setAmount(e.target.value)}/>
                    </form>
                </TableCell>
                <TableCell>
                    {result.event.status === "finished" ? (
                        <span>$ {parseFloat(betReturn).toFixed(2)}</span>
                    ): <span>TBD</span>}
                </TableCell>
            </TableRow>
            ):(
            <TableRow>
                <TableCell>
                    Event is still fetching...
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}