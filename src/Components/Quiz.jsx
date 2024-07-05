import React, { useState, useEffect } from 'react';
import questionsData from '../Quiz.json';


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(15);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsData.length).fill(null));

    useEffect(() => {
        if (timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            handleNextQuestion();
        }
    }, [timer]);

    const handleAnswerClick = (e) => {
        const answer = e.target.value;
        const updatedSelectedAnswers = [...selectedAnswers];

        if (updatedSelectedAnswers[currentQuestion] !== answer) {
            
            if (updatedSelectedAnswers[currentQuestion] === questionsData[currentQuestion].correctOption) {
                setScore((prevScore) => prevScore - 1);
            }
            
            if (answer === questionsData[currentQuestion].correctOption) {
                setScore((prevScore) => prevScore + 1);
            }
            updatedSelectedAnswers[currentQuestion] = answer;
            setSelectedAnswers(updatedSelectedAnswers);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questionsData.length-1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setTimer(15);
        } else {
            setShowScore(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
            setTimer(15);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(15);
        setSelectedAnswers(Array(questionsData.length).fill(null));
    };

    return (
        <>
            <div className="quiz-app">
                {showScore ? (
                    <div className="score-section">
                        <h2>Your score: {score}/{questionsData.length}</h2>
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                ) : (
                    <div className="question-section">
                        <h1>Question {currentQuestion + 1}</h1>
                        <p>{questionsData[currentQuestion].question}</p>
                        <div className="options">
                            {questionsData[currentQuestion].options.map((option, index) => (
                                <div key={index} className={`opt ${selectedAnswers[currentQuestion] === option ? 'selected' : ''}`}>
                                    <input 
                                        type="radio" 
                                        id={option} 
                                        name="option" 
                                        value={option} 
                                        checked={selectedAnswers[currentQuestion] === option} 
                                        onChange={handleAnswerClick} 
                                    />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))}
                        </div>
                        <div className="timer">
                            Time left: <span>{timer}s</span>
                        </div>
                        <div className="navigation-buttons">
                            {currentQuestion > 0 && (
                                <button className="prev-button" onClick={handlePreviousQuestion}>Previous</button>
                            )}
                            {currentQuestion < questionsData.length && (
                                <button className="next-button" onClick={handleNextQuestion}>Next</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Quiz;







