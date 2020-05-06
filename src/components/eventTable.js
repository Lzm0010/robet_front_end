import React, {Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
      minWidth: 650,
      maxHeight: 350,
      minHeight: 350
    },
    header: {
        fontSize: 12
    }
});

export default function EventTable ({headers, children}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                    {children.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (
                            row
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination 
          rowsPerPageOptions={[10,15,25]}
          component="div"
          count={children.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Fragment>
    )
}