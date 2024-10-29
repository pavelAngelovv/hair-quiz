import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/questions.css';
import arrow from '../images/right-arrow.png';

interface QuestionProps {
    question: string;
    answers: string[];
    questionKey: string;
    nextQuestionPath: string;
    previousQuestionPath: string;
}

const Question: React.FC<QuestionProps> = ({ question, answers, questionKey, nextQuestionPath, previousQuestionPath }) => {
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');

    const alphabetLabels = "abcdefghijklmnopqrstuvwxyz".split(""); // Array of letters for labels

    useEffect(() => {
        const storedAnswer = localStorage.getItem(questionKey);
        if (storedAnswer) {
            setSelectedAnswer(storedAnswer);
        }
    }, [questionKey]);

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer); 
        localStorage.setItem(questionKey, answer); 
    };

    const handleNext = () => {
        navigate(nextQuestionPath); 
    };

    const handleBack = () => {
        navigate(previousQuestionPath); 
    };

    return (
        <div className="question-container">
            <h1 className="question-title">{question}</h1>
            <div className="answer-buttons">
                {answers.map((answer, index) => (
                    <button
                        key={answer}
                        className={`outlined-button ${selectedAnswer === answer ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelection(answer)}
                    >
                        {alphabetLabels[index]}. {answer}
                    </button>
                ))}
            </div>
            <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>Back</button>
                <button className="next-button" onClick={handleNext}>
                    Next question <img src={arrow} alt="Arrow" style={{ width: '20px', marginLeft: '8px', marginBottom: '-5px' }} />
                </button>
            </div>
        </div>
    );
};

export default Question;
