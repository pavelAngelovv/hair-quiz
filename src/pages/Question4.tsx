import React from 'react';
import Question from '../components/Question.tsx';

const Question4: React.FC = () => {
    return (
        <Question
            question="Is there anything troubling you about your hair?"
            answers={['Breakage', 'Frizz', 'Scalp dryness', 'Damage', 'Tangling']}
            questionKey="anythingTroubling"
            nextQuestionPath="/question5"
            previousQuestionPath="/question3"
            currentQuestion={4}
        />
    );
};

export default Question4;
