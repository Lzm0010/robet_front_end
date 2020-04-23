import React, {useState, useEffect, useCallback} from 'react';
import ReactCardFlip from 'react-card-flip';
import Login from '../components/login';
import Signup from '../components/signup';

export default function Auth () {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipClick = useCallback(e => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }, [isFlipped]);

    useEffect(() => {
       document.addEventListener('click', handleFlipClick);

       return () => {
        document.removeEventListener('click', handleFlipClick);
       };
    }, [handleFlipClick]);

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <Login flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1}/>
            <Signup flip={handleFlipClick} flipDirection="horizontal" flipSpeedBackToFront={0.1}/>
        </ReactCardFlip>
    );
}