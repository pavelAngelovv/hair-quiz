import React from 'react';
import Question from '../components/Question.tsx';

const Question2: React.FC = () => {
    return (
        <Question
            question="How often do you wash your hair?"
            answers={['Daily', 'Every other day', 'Twice a week', 'Once a week', 'Every two weeks']}
            questionKey="howOftenWashHair"
            nextQuestionPath="/question3"
            previousQuestionPath="/question1"
            currentQuestion={2}
        />
    );
};

export default Question2;
