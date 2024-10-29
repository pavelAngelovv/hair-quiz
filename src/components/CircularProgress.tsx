import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
    value: number; // Define value as a number
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
    return (
        <CircularProgressbar
            value={value}
            text={`${value} questions left`}
            styles={{
                path: { stroke: `#4db8ff` },
                text: { fill: '#f88', fontSize: '16px' },
            }}
        />
    );
};

export default CircularProgress;
