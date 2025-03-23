import React from 'react';
import Lottie from 'lottie-react';
import BoxOfCards from '../../../../core/lotties/BoxOfCardsAnimation.json';

const BoxOfCardsAnimation  = ({ height = 200, width = 200 }) => {
    return (
        <div>
            <Lottie animationData={BoxOfCards} style={{ height, width }} />
        </div>
    );
};

export default BoxOfCardsAnimation ;