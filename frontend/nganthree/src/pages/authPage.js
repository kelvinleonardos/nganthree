import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthGroup from './components/authGroup';

function AuthPage() {

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post(`${backendUrl}/auth/verify-token`, { token: token });
          if (response.data.valid) {
            navigate('/'); 
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          localStorage.removeItem('token');
          console.error('Token verification error:', err);
        }
      };
      verifyToken();
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <AuthGroup /> 
    </div>
  );
}

export default AuthPage;
