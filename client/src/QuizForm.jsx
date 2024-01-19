// QuizForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css';

const QuizForm = ({ onAddQuiz, filliere }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', ''], correctOption: 0 }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', ''], correctOption: 0 }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form (you may want to add more validation)
    if (title.trim() === '' || questions.some(question => question.questionText.trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }

    // Construct the quiz object
    const newQuiz = {
      title,
      questions: questions.map(question => ({
        questionText: question.questionText,
        options: question.options.map((option, index) => ({
          optionText: option,
          isCorrect: index === question.correctOption
        }))
      })),
      filliere,
    };

    // Send the quiz data to the backend API
    axios.post('http://localhost:3000/addQuiz', newQuiz)
      .then(response => {
        // Notify the parent component about the added quiz
        // onAddQuiz(response.data);

        // Clear the form
        setTitle('');
        setQuestions([{ questionText: '', options: ['', '', ''], correctOption: 0 }]);
      })
      .catch(error => {
        console.error('Error adding quiz:', error);
        alert('Error adding quiz. Please try again.');
      });

    // Clear the form
    setTitle('');
    setQuestions([{ questionText: '', options: ['', '', ''], correctOption: 0 }]);
  };

  return (
    <div className="contain">
      <Link  className="form-header"  style={{ textDecoration: 'none' }}>
        <h2>Add Quiz</h2>
      </Link>
      <Link to={{ pathname: '/Allquiz', search: `?filliere=${filliere}` }} style={{ textDecoration: 'none' }}>
  <h2 className="allquiz">All Quizzes</h2>
</Link>
<Link to={{ pathname: '/Results', search: `?filliere=${filliere}` }} style={{ textDecoration: 'none' }}>
  <h2 className="allresult">Results</h2>
</Link>

      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label className="form-label">Title:</label>
        <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} />

        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <label className="form-label">Question {index + 1}:</label>
            <input
              type="text"
              className="form-input"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
            />

            <label className="form-label">Options:</label>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option-container">
                <input
                  type="text"
                  className="form-input"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              </div>
            ))}

            <label className="form-label">Correct Option:</label>
            <select
              className="form-select"
              value={question.correctOption}
              onChange={(e) => handleQuestionChange(index, 'correctOption', parseInt(e.target.value, 10))}
            >
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="button" className="form-button add-question-button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
