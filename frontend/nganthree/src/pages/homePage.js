import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';

function HomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post(`${backendUrl}/auth/verify-token`, { token: token });
          if (!response.data.valid) {
            navigate('/auth');
            localStorage.removeItem("token");
          }
        } catch (err) {
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
      <h1>Halo</h1>
      <LogoutButton /> {/* Tambahkan tombol logout */}
    </div>
  );
}

export default HomePage;
