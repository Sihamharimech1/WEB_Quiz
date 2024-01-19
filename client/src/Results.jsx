import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation correctly
import axios from 'axios';

const Results = () => {
    const location = useLocation();
    const [filliere, setFilliere] = useState('');
    const [quizResults, setQuizResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filliereParam = params.get('filliere');
        setFilliere(filliereParam);

        axios.get(`http://localhost:3000/quizResults?filliere=${filliereParam}`)
            .then(response => {
                setQuizResults(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching quiz results:', error);
                setError('Failed to load quiz results');
                setIsLoading(false);
            });
    }, [location.search]);

    if (isLoading) {
        return <p>Loading quiz results...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>
            <h1>Quiz Results</h1>
            <table>
                <thead>
                    <tr>
                        <th>Filliere</th>
                        <th>Quiz Title</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {quizResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.filliere}</td>
                            <td>{result.quizTitle}</td>
                            <td>{result.user}</td>
                            <td>{result.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Results;
