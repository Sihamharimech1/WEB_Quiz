import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.data.success) {
        console.log(response.data);
        setEmail('');
        setPassword('');
        navigate('/HomeStudent', { state: { user: response.data.user } });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='all' style={{ backgroundColor: 'rgb(212, 211, 211)', height: '650px', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='box' style={{ width: '350px', height: '400px' }}>
        <form onSubmit={handleSubmit}>
          <div className='unit'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <div className='unit'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
          </div>
          <div className='unit'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
