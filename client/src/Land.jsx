// QuizFil.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const QuizFil = () => {
  const location = useLocation();
  const [filliere, setFilliere] = useState('');
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filliereParam = params.get('filliere');
    setFilliere(filliereParam);

    // Fetch quiz data based on the 'filliere' parameter
    axios.get(`http://localhost:3000/quizzes?filliere=${filliereParam}`)
      .then(response => {
        setQuizData(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, [location.search]);

  return (
    <div className="containe">
      <h1>Quizzes for {filliere}</h1>

      {quizData.length === 0 ? (
        <div className='om'>
        <p className="noQuizzes">No quizzes available for this filliere.</p>
        </div>
      ) : (
        quizData.map((quiz, quizIndex) => (
          <div key={quiz._id} className="quiz space">
            <h2>{quiz.title}</h2>

            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question">
                <p>
                  <strong>Question {questionIndex + 1}:</strong> {question.questionText}
                </p>
                <ul className="options">
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="option">
                      {option.isCorrect ? (
                        <span className="correctOption">{option.optionText} (Correct)</span>
                      ) : (
                        <span>{option.optionText}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default QuizFil;
