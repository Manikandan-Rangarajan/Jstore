import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem('userId');
    // Redirect to the signup page after logout
    window.location.href = `${window.location.origin}/`;  
  }, [navigate]);

  return (
    <div>
      <h2>Logging you out...</h2>
    </div>
  );
}

export default Logout;
