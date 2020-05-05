import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
      minWidth: 650,
      maxHeight: 770,
      minHeight: 370
    },
    header: {
        fontSize: 12
    }
});

export default function DrawerTable ({headers, children}) {
    const classes = useStyles();

    return (
        <Fragment>
        <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader className={classes.table} size="small" aria-label="sticky table">
                <TableHead>
                <TableRow>
                    {headers !== undefined ? (
                        headers.map((header, index) => {
                            return <TableCell className={classes.header} key={`head-${index}`} align="center">{header}</TableCell>
                        })
                    ) : (<TableCell>Waiting on the World to Change</TableCell>)}
                </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </TableContainer>
        </Fragment>
    )
}