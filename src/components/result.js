import React, {Fragment, useState} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Result ({result}) {
    const [amount, setAmount] = useState("")
    
    const handleAmount = (event, ticket_id) => {
        event.preventDefault()
        const editTicketUrl = `http://localhost:3000/tickets/${ticket_id}`
        const token = localStorage.getItem('token')
        const patchObj = {
            'method': 'PATCH',
            'headers': {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify({amount:amount}) 
        }
        fetch(editTicketUrl, patchObj)
            .then(res => res.json())
            .then(ticket => setAmount(ticket.amount))
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
                    {result.event.away_score} - {result.event.home_score}
                </TableCell>
                <TableCell>
                    <form onSubmit={e => handleAmount(e, result.tickets[0].id)}>
                        <input type="number" name="amount" placeholder={result.tickets[0].amount} value={amount} onChange={e => setAmount(e.target.value)}/>
                    </form>
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