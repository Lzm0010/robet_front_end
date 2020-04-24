import React, {Fragment} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Result ({result}) {

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
                    {result.away_score} - {result.home_score}
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