import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [nom, setNom] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const categories = [
    { value: 'tm', label: 'TM' },
    { value: 'mt', label: 'MT' },
    { value: 'gi', label: 'GI' },
    { value: 'idsd', label: 'IDSD' },
    { value: 'ge', label: 'GE' },
    { value: 'err', label: 'ERR' },
    { value: 'isil', label: 'ISIL' },
    { value: 'mge', label: 'MGE' },
    { value: 'erdd', label: 'ERDD' },
    { value: 'mbf', label: 'MBF' },
    { value: 'mt-lp', label: 'MT - LP' },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    const formData = { nom, email, password, filliere: selectedOption };

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log(response.data);

      // Reset form fields
      setNom('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Your styling and JSX code remains the same

  return (
    <div className='all'>
      <div className='box'>
        <form onSubmit={handleSubmit}>
          <div className='unit'>
            <label htmlFor='nom'>Nom</label>
            <input type='text' id='nom' name='nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
          </div>
          <div className='unit'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className='unit'>
          <label>Select a category:</label>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
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
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='unit'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <div className='un'>
          <p>You already have an Account. Log in!</p>
          <Link to='/BigLogin'>
            <Button>Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;