import React from 'react';
import Question from '../components/Question.tsx';

const Question1: React.FC = () => {
    return (
        <Question
            question="What's your hair type or texture?"
            answers={['Straight', 'Curly', 'Wavy', 'Fine']}
            questionKey="question1Answer"
            nextQuestionPath="/question2"
            previousQuestionPath="/"
            currentQuestion={1}
        />
    );
};

export default Question1;
