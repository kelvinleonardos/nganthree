import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';
import QueueForm from './components/queue';

function HomePage({ darkMode }) {  // Terima props darkMode
  const [showForm, setShowForm] = useState(false);
  const [queues, setQueues] = useState([]); // State untuk menyimpan daftar antrian
  const navigate = useNavigate();

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await axios.post(`${backendUrl}/auth/verify-token`, { token });
          if (!response.data.valid) {
            navigate('/auth');
            localStorage.removeItem('token');
          }
        } catch (err) {
          localStorage.removeItem('token');
          console.error('Token verification error:', err);
        }
      };
      verifyToken();

      // Panggil fungsi untuk mengambil antrian saat halaman dimuat
      fetchUserQueues();
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  // Fungsi untuk mengambil antrian user yang login
  const fetchUserQueues = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    
    try {
      const userResponse = await axios.post(
        `${backendUrl}/auth/current-user`, 
        { token }
      );

      const userId = userResponse.data.user.userId;

      const response = await axios.post(`${backendUrl}/queues/user-queues`, { userId });
      setQueues(response.data);
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };

  return (
    <div>
      <LogoutButton />

      <button
        type="button"
        className="btn btn-primary"
        style={{ margin: '10px 20px' }}
        onClick={() => setShowForm(true)}
      >
        Register Queue
      </button>

      {/* Tampilkan daftar antrian */}
      <div style={{ margin: '20px' }}>
        <h2>Your Queues</h2>
        {queues.length > 0 ? (
          <table className={`table ${darkMode ? 'table-dark' : ''}`}>
            <thead>
              <tr>
                <th>Queue No</th>
                <th>Admin</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {queues.map(queue => (
                <tr key={queue.id}>
                  <td>{queue.queueNo}</td>
                  <td>{queue.adminName}</td>
                  <td>{queue.statusName}</td>
                  <td>{new Date(queue.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data</p>
        )}
      </div>

      {showForm && <QueueForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default HomePage;
