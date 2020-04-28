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
                <TableCell>
                    {friend.username}
                </TableCell>
                <TableCell>
                    {friend.record.wins}
                </TableCell>
                <TableCell>
                    {friend.record.losses}
                </TableCell>
                <TableCell>
                    {friend.record.ties}
                </TableCell>
                <TableCell>

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