// src/pages/Question1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Question1 = () => {
    const navigate = useNavigate();

    const handleAnswer = (answer) => {
        // Save answer to state or context
        navigate('/question2');
    };

    return (
        <div>
            <h1>What's your hair type or texture?</h1>
            <button onClick={() => handleAnswer('Straight')}>Straight</button>
            <button onClick={() => handleAnswer('Curly')}>Curly</button>
            <button onClick={() => handleAnswer('Wavy')}>Wavy</button>
            <button onClick={() => handleAnswer('Fine')}>Fine</button>
        </div>
    );
};

export default Question1;
