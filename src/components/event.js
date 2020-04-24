import React, {Fragment} from 'react';
import BetsContainer from '../containers/betsContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Event ({event, addBet}) {
    return (
        <Fragment>

        {event !== undefined ? (
            <TableRow>
                <TableCell component="th" scope="row">
                    {event.away_team.name} @ {event.home_team.name}
                </TableCell>
                <BetsContainer bets={event.bets} addBet={addBet} />
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