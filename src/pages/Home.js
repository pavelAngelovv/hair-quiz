// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // We’ll create this file for styling

const Home = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/question1');
    };

    return (
        <div className="home">
            <div className="home__background">
                <div className="home__overlay">
                    <h1 className="home__title">Find Your Perfect Hair Care Routine</h1>
                    <p className="home__description">Take this quick quiz to get personalized recommendations for your hair type and needs.</p>
                    <button className="home__button" onClick={handleStartQuiz}>
                        Start the Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
