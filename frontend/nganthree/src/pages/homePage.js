import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post('http://localhost:7000/auth/verify-token', { token: token });
          if (!response.data.valid) {
            navigate('/auth'); 
            localStorage.removeItem("token");
          }
        } catch (err) {
          setError('Failed to verify token');
          localStorage.removeItem('token');
          console.error('Token verification error:', err);
        }
      };
      verifyToken();
    } else {
      navigate('/auth'); 
    }
  }, [navigate]);

  return (
    <div>
      <h1>
        Halo
      </h1>
    </div>
  );
}

export default HomePage;
