import React, {Fragment} from 'react';
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


export default function RobetResult ({prediction}) {
    const classes = useStyles()

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
        {prediction !== undefined ? (
            <TableRow>
                <TableCell component="th" scope="row">
                    {prediction.event.away_team.name} @ {prediction.event.home_team.name}
                </TableCell>
                <TableCell>
                    {prediction.position} - {prediction.line}
                </TableCell>
                <TableCell>
                    {parseFloat(prediction.prediction.away_score).toFixed(2)} | {parseFloat(prediction.prediction.home_score).toFixed(2)}
                </TableCell>
                <TableCell>
                    {parseFloat(prediction.prediction_delta).toFixed(3)}
                </TableCell>
                <TableCell>
                    {renderSwitch(prediction.outcome)}
                    {prediction.event.away_score} - {prediction.event.home_score}
                </TableCell>
            </TableRow>
            ):(
            <TableRow>
                <TableCell>
                    Prediction is still fetching...
                </TableCell>
            </TableRow>
        )}
        </Fragment>
    )
}