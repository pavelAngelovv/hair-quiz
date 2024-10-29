import React from 'react';
import Question from '../components/Question.tsx';

const Question5: React.FC = () => {
    return (
        <Question
            question="What is your natural hair color(s) today?"
            answers={['Black', 'Brown', 'Blonde', 'Red/Orange', 'Silver/Grey']}
            questionKey="question5Answer"
            nextQuestionPath="/results"
            previousQuestionPath="/question4"
        />
    );
};

export default Question5;
