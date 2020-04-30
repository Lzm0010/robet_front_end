import React, {Fragment, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import RemoveTicketButton from './removeTicketButton';

const useStyles = makeStyles({
    win: {
        color: 'green',
    },
    loss: {
        color: 'red',
    },
    push: {
        color: 'grey'
    },
    logo: {
        width: 30,
        height: 20
    },
    cells: {
        fontSize: 11
    }
})

function importAll(r){
    let images = {};
    r.keys().map(item => images[item.replace('./', '')] = r(item));
    return images;
}

const logos = importAll(require.context('../assets/images/mlb', false, /\.gif$/)); 

export default function Result ({result, ticketId, handleBalance, deleteTicket}) {
    const [amount, setAmount] = useState(result.tickets.find(ticket=> ticket.id === ticketId).amount)
    const [betReturn, setBetReturn] = useState(result.tickets.find(ticket=> ticket.id === ticketId).return)
    const classes = useStyles()

    const mapLogo = () => {
        const homeTeam = logos[`${result.event.home_team.logo}`]
        const awayTeam = logos[`${result.event.away_team.logo}`]
        return [homeTeam, awayTeam]
    }
    
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

    const positionLogo = () => {
        if (result.position === "Home"){
            return <img className={classes.logo} src={logos[`${result.event.home_team.logo}`]} alt={result.position} />
        } else if (result.position === "Away") {
            return <img className={classes.logo} src={logos[`${result.event.away_team.logo}`]} alt={result.position} />
        } else {
            return result.position
        }
    }

    return (
        <Fragment>
        {result !== undefined ? (
            <TableRow hover role="checkbox" tabIndex={-1} key={`result-row-${result.id}`}>
                <TableCell component="th" scope="row" className={classes.cells}>
                    <img className={classes.logo} src={mapLogo()[1]} alt={result.event.away_team.name}/> {result.event.away_team.name} @ <img className={classes.logo} src={mapLogo()[0]} alt={result.event.home_team.name}/> {result.event.home_team.name}
                </TableCell>
                <TableCell className={classes.cells}>
                    {positionLogo()}
                </TableCell>
                <TableCell className={classes.cells}>
                    {result.line !== null ? <span>{result.line} | </span> : null}{result.odds}
                </TableCell>
                <TableCell className={classes.cells}>
                    {renderSwitch(result.outcome)}
                    {result.event.away_score} - {result.event.home_score}
                </TableCell>
                <TableCell className={classes.cells}>
                    <form onSubmit={e => handleAmount(e)}>
                        <input type="number" name="amount" required placeholder={result.tickets.find(ticket=> ticket.id === ticketId).amount} value={amount} onChange={e => setAmount(e.target.value)}/>
                    </form>
                </TableCell>
                <TableCell className={classes.cells}>
                    {result.event.status === "finished" ? (
                        <span>$ {parseFloat(betReturn).toFixed(2)}</span>
                    ): <span>TBD</span>}
                </TableCell>
                <TableCell>
                    <RemoveTicketButton ticketId={ticketId} deleteTicket={deleteTicket}/>
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