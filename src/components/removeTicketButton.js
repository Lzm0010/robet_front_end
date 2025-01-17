import React from 'react';
import {red} from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';

function CloseCircle(props){
    return (
        <SvgIcon {...props} fontSize="inherit">
            <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
        </SvgIcon>
    );
}

export default function removeTicketButton ({ticketId, deleteTicket}) {

    const handleClick = () => {
        deleteTicket(ticketId)
    }


    return (
        // <Fab size="small" aria-label="add">
            <CloseCircle onClick={handleClick} style={{color: red[500] }} />
        //{/* </Fab> */}
    )
}