import React, {Fragment} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TrackBetButton from './trackBetButton';

export default function Prediction ({prediction, addBet}) {

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
                    {prediction.prediction.away_score} | {prediction.prediction.home_score}
                </TableCell>
                <TableCell>
                    {prediction.prediction_delta}
                    <TrackBetButton key={`pb-${prediction.id}`} betId={prediction.id} addBet={addBet} />
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