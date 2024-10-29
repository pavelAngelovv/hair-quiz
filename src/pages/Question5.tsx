import React from 'react';
import Question from '../components/Question.tsx';

const Question5: React.FC = () => {
    return (
        <Question
            question="What is your natural hair color(s) today?"
            answers={['Black', 'Brown', 'Blonde', 'Red/Orange', 'Silver/Grey']}
            questionKey="naturalColor"
            nextQuestionPath="/results"
            previousQuestionPath="/question4"
            currentQuestion={5}
        />
    );
};

export default Question5;
