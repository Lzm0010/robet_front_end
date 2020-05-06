import React, {Fragment} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Friend ({friend}) {

    return (
        <Fragment>
        {friend !== undefined ? (
            <TableRow>
                <TableCell component="th" scope="row">
                    
                </TableCell>
                <TableCell align="center">
                    {friend.username}
                </TableCell>
                <TableCell align="center">
                    {friend.record.wins}
                </TableCell>
                <TableCell align="center">
                    {friend.record.losses}
                </TableCell>
                <TableCell align="center">
                    {friend.record.ties}
                </TableCell>
                <TableCell align="center">

                </TableCell>
            </TableRow>
            ):(
            <TableRow>
                <TableCell>
                    No Friends yet!
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}