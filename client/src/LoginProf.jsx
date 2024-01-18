import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginProf = () => {
        
  const [professionalId, setProfessionalId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loginData = { professionalId, password };

    try {
      const response = await axios.post('http://localhost:3000/loginProf', loginData);
  
      // Check for a successful response status (e.g., 200 OK)
      if (response.data.success) {
        console.log(response.data);
        setProfessionalId('');
        setPassword('');
        navigate('/home');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Your styling and JSX code remains the same
  const stl = {
    backgroundColor: 'rgb(212, 211, 211)',
    height: '650px',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
const stle ={
    width: '350px',
    height: '400px',
}  
  return (
    <div className='all' style={stl}>
      <div className='box' style={stle}>
        <form onSubmit={handleSubmit}>
          <div className='unit'>
            <label htmlFor='professionalId'>ProfessionalId</label>
            <input
              type='text'
              id='professionalId'
              name='professionalId'
              value={professionalId}
              onChange={(e) => setProfessionalId(e.target.value)}
              required
            />
          </div>
          <div className='unit'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
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
}
 
export default LoginProf;