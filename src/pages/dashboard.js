import React, {Fragment} from 'react';
import EventsContainer from '../containers/eventsContainer';
import ResultsContainer from '../containers/resultsContainer';
import FriendsContainer from '../containers/friendsContainer';

export default function Dashboard () {
    return (
        <Fragment>
            <EventsContainer />
            <ResultsContainer />
            <FriendsContainer />
            <EventsContainer />
        </Fragment>
    );
}