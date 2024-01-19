import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './nav';
import axios from 'axios';

const HomeStudent = () => {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [submittedQuizzes, setSubmittedQuizzes] = useState({});
  const [activeQuizzes, setActiveQuizzes] = useState({});

  const location = useLocation();
  const { state } = location;
  const { user } = state || {};

  useEffect(() => {
    axios.get(`http://localhost:3000/quizzes?filliere=${user?.filliere}`)
      .then(response => {
        setQuizData(response.data);
        initializeStates(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, [user?.filliere]);

  const initializeStates = (quizzes) => {
    const initialAnswers = {};
    const initialActiveQuizzes = {};
    quizzes.forEach(quiz => {
      initialActiveQuizzes[quiz._id] = false;
      quiz.questions.forEach((_, questionIndex) => {
        initialAnswers[`${quiz._id}_${questionIndex}`] = null;
      });
    });
    setUserAnswers(initialAnswers);
    setActiveQuizzes(initialActiveQuizzes);
  };

  const handleAnswer = (quizId, questionIndex, optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [`${quizId}_${questionIndex}`]: optionIndex
    });
  };

  const handleSubmit = (quizId, quizQuestions) => {
    let quizScore = 0;
    quizQuestions.forEach((question, questionIndex) => {
      if (question.options[userAnswers[`${quizId}_${questionIndex}`]]?.isCorrect) {
        quizScore += 1;
      }
    });
    setScores({
      ...scores,
      [quizId]: quizScore
    });
    setSubmittedQuizzes({
      ...submittedQuizzes,
      [quizId]: true
    });
  };
  const toggleQuiz = (quizId) => {
    setActiveQuizzes(prevActiveQuizzes => ({
      ...prevActiveQuizzes,
      [quizId]: !prevActiveQuizzes[quizId]
    }));
  };
  
  
  return (
    <>
      <NavBar />
      <h1>Quizzes for {user?.filliere}</h1>
      <div  className="quizContainer">
        {quizData.length === 0 ? (
          <p className="noQuizzes">No quizzes available for this filliere.</p>
        ) : (
          quizData.map(quiz => (
            <div>
            <div key={quiz._id} className="quizCard">
              <div className="quizHeader">
                <h2>{quiz.title}</h2>
                <button onClick={() => toggleQuiz(quiz._id)}>
                    {activeQuizzes[quiz._id] ? 'Hide Quiz' : 'Take Quiz'}
                 </button>
              </div>
              {activeQuizzes[quiz._id] && (
                    <div className="quizContent">
                  {quiz.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="question">
                      <p>
                        <strong>Question {questionIndex + 1}:</strong> {question.questionText}
                      </p>
                      <ul className="options">
                        {question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="option">
                            <label>
                            <input
                              type="radio"
                              name={`question_${quiz._id}_${questionIndex}`}
                              checked={userAnswers[`${quiz._id}_${questionIndex}`] === optionIndex}
                              onChange={() => handleAnswer(quiz._id, questionIndex, optionIndex)}
                            />

                              {option.optionText}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {!submittedQuizzes[quiz._id] && (
                    <button onClick={() => handleSubmit(quiz._id, quiz.questions)}>Submit Quiz</button>
                  )}
                  {submittedQuizzes[quiz._id] && (
                    <p>Score for this quiz: {scores[quiz._id]}/{quiz.questions.length}</p>
                  )}
                </div>
              )}
            </div>
            </div>
          ))
        )}
      </div>
    </>
  );
  
};

export default HomeStudent;
