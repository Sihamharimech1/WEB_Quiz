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
  const [QId, setQId] = useState(0);
  const [QUser, setQUser] = useState(0);
  const [Qtitle, setQtitle] = useState('');
  const [Qscore, setQscore] = useState(0);
  const location = useLocation();
  const { state } = location;
  const { user } = state || {};
          
  useEffect(() => {
    if (user?.id) {
      setQUser(user.id);
    }
    if (user?.filliere) {
      axios.get(`http://localhost:3000/quizzes?filliere=${user.filliere}`)
        .then(response => {
          setQuizData(response.data);
          initializeStates(response.data);
        })
        .catch(error => {
          console.error('Error fetching quiz data:', error);
        });
    }
  }, [user?.id, user?.filliere]);

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
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [`${quizId}_${questionIndex}`]: optionIndex
    }));
  };

  const handleSubmit = (quizId, quizQuestions) => {
    let quizScore = 0;
    quizQuestions.forEach((question, questionIndex) => {
      if (question.options[userAnswers[`${quizId}_${questionIndex}`]]?.isCorrect) {
        quizScore += 1; 
      }
    });
  
    // Update the local state
    setScores(prevScores => ({
      ...prevScores,
      [quizId]: quizScore
    }));
    setQscore(quizScore); // Update Qscore with the calculated quizScore
    setSubmittedQuizzes(prevSubmittedQuizzes => ({
      ...prevSubmittedQuizzes,
      [quizId]: true
    }));
  
    // Create the QuizInfo object with updated values
    const QuizInfo = {
      QId: quizId,
      QUser: QUser,
      Qtitle: quizData.find(quiz => quiz._id === quizId)?.title,
      Qscore: quizScore, // Use the updated quizScore
      filliere: user?.filliere,
      nomuser: user?.nom
    };
  
    // Send QuizInfo to the backend
    axios.post('http://localhost:3000/submitQuiz', QuizInfo)
      .then(response => {
        console.log('Quiz submitted successfully:', response.data);
        // Handle successful submission response
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
        // Handle error in submission
      });
  };
  

  const toggleQuiz = (quizId) => {
    setQuizData(prevQuizData => prevQuizData.map(quiz => {
      if (quiz._id === quizId) {
        setQId(quiz.active ? null : quizId); // Set QId when opening a quiz, reset when closing
        setQtitle(quiz.active ? '' : quiz.title); // Set Qtitle similarly
        return { ...quiz, active: !quiz.active };
      }
      return quiz;
    }));
    setActiveQuizzes(prevActiveQuizzes => ({
      ...prevActiveQuizzes,
      [quizId]: !prevActiveQuizzes[quizId]
    }));
  };

  return (
    <>
      <NavBar />
      <h1>Quizzes for {user?.filliere}</h1>
      <div className="quizContainer">
        {quizData.length === 0 ? (
          <p className="noQuizzes">No quizzes available for this filliere.</p>
        ) : (
          quizData.map(quiz => (
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
          ))
        )}
      </div>
    </>
  );
};

export default HomeStudent;
