import React from 'react';
// import Fab from '@material-ui/core/Fab';
import {green} from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

function PlusCircleOutline(props){
    return (
        <SvgIcon {...props} fontSize="inherit">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
        </SvgIcon>
    );
}

export default function TrackBetButton ({betId, addBet}) {

    const handleClick = () => {
        addBet(betId)
    }


    return (
        // <Fab size="small" aria-label="add">
            <PlusCircleOutline onClick={handleClick} style={{color: green[500] }} />
        //{/* </Fab> */}
    )
}