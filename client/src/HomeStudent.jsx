import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './nav';
import axios from 'axios';

const HomeStudent = () => {
  const location = useLocation();
  const { state } = location;
  const { user } = state || {};
  const [qcms, setQCMs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQCMs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/quizzes/${user?.filliere}`);
        setQCMs(response.data || []);
        const initialAnswers = {};
        (response.data || []).forEach((qcm) => {
          initialAnswers[qcm._id] = '';
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching QCMs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.filliere) {
      fetchQCMs();
    }
  }, [user?.filliere]);

  const handleAnswerChange = (qcmId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qcmId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post(`http://localhost:3000/submit-answers`, {
        userId: user?._id,
        answers,
      });
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <p>User Filliere: {user?.filliere || 'Not available'}</p>
        <h2>QCMs:</h2>
        {isLoading ? (
          <p>Loading QCMs...</p>
        ) : qcms.length > 0 ? (
          <ul>
            {qcms.map((qcm) => (
              <li key={qcm._id}>
                <strong>{qcm.title}</strong>
                {qcm.options && qcm.options.length > 0 ? (
                  <ul>
                    {qcm.options.map((option) => (
                      <li key={option._id}>
                        <input
                          type="radio"
                          id={option._id}
                          name={qcm._id}
                          value={option.text}
                          checked={answers[qcm._id] === option.text}
                          onChange={() => handleAnswerChange(qcm._id, option.text)}
                        />
                        <label htmlFor={option._id}>{option.text}</label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No options available for this question.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No QCMs available.</p>
        )}

        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </button>

        {score !== null && (
          <div>
            <h2>Score: {score}</h2>
            {/* Display other details based on your requirements */}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeStudent;
