import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
    value: number;
    currentQuestion: number;
    totalQuestions: number;
}

const circularProgressStyles = {
    path: { stroke: `#AADDF3` },
    text: { 
        fill: '#000000', 
        fontSize: '20px', 
        fontFamily: '"Gayathri", sans-serif', 
        fontWeight: 200, 
        fontStyle: 'normal',
    },
    trail: { 
        stroke: '#EEF7FB',
    },
};

const CircularProgress: React.FC<CircularProgressProps> = ({ value, currentQuestion, totalQuestions }) => {
    const size = 90;
    const strokeWidth = 5;

    return (
        <div style={{ width: size, height: size }}>
            <CircularProgressbar
                value={value}
                text={`${currentQuestion}/${totalQuestions}`}
                styles={circularProgressStyles}
                strokeWidth={strokeWidth}
            />
        </div>
    );
};

export default CircularProgress;
