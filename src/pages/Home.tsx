import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        navigate('/question1');
    };

    return (
        <div className="home">
            <div className="home__background">
                <div className="home__overlay">
                    <h1 className="title">Build a self care routine <br/> suitable for you</h1>
                    <p className="description">Take out test to get a personalised self care <br/> routine based on your needs.</p>
                    <button className="button-text home__button" onClick={handleStartQuiz}>Start the quiz</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
