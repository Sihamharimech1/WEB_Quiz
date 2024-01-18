import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Make an HTTP request to the server's logout endpoint
      const response =  await axios.get('/logout');
      if(response.data.success){
        navigate('/login');
      }
      // Redirect to the sign-in page after successful logout
     
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
