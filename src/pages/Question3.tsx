import React from 'react';
import Question from '../components/Question.tsx';

const Question3: React.FC = () => {
    return (
        <Question
            question="What benefit do you look for in your hair products?"
            answers={['Anti-breakage', 'Hydration', 'Soothing dry scalp', 'Repairs the appearance of damaged hair', 'Volume', 'Curl and coil enhancing']}
            questionKey="question3Answer"
            nextQuestionPath="/question4"
            previousQuestionPath="/question2"
        />
    );
};

export default Question3;