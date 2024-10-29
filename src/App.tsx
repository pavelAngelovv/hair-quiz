import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Question1 from './pages/Question1.tsx';
import Question2 from './pages/Question2.tsx';
import Question3 from './pages/Question3.tsx';
import Question4 from './pages/Question4.tsx';
import Question5 from './pages/Question5.tsx';
import Results from './pages/Results.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/question1" element={<Question1 />} />
                <Route path="/question2" element={<Question2 />} />
                <Route path="/question3" element={<Question3 />} />
                <Route path="/question4" element={<Question4 />} />
                <Route path="/question5" element={<Question5 />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </Router>
    );
};

export default App;
