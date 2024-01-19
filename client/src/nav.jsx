import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
     
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Make an HTTP request to the server's logout endpoint
      await axios.get('/logout');

      // Redirect to the sign-in page after successful logout
      navigate('/BigLogin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
    return (  
        <div className="Nav">
            <img src="estessaouira.couleur-300x300.png" />
            
        <button onClick={handleLogout}>Logout</button>
         
        </div>
    );
}

export default NavBar;