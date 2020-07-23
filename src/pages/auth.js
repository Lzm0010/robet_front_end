import React, {useState, useCallback} from 'react';
import ReactCardFlip from 'react-card-flip';
import Login from '../components/login';
import Signup from '../components/signup';

export default function Auth (props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipClick = useCallback(e => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }, [isFlipped]);

    return (
        <div className="background">
        <ReactCardFlip isFlipped={isFlipped}>
            <Login flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1} {...props} handleLogin={props.handleLogin}/>
            <Signup flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1} {...props} handleLogin={props.handleLogin}/>
        </ReactCardFlip>
        </div>
    );
}