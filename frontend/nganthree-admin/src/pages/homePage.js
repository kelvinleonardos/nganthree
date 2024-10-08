import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';

function HomePage({ darkMode }) {
  const [queues, setQueues] = useState([]); // State untuk menyimpan daftar antrian
  const [statuses, setStatuses] = useState([]); // State untuk menyimpan daftar status
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

      // Panggil fungsi untuk mengambil antrian berdasarkan adminId saat halaman dimuat
      fetchQueuesByAdmin();
      fetchStatuses(); // Panggil fungsi untuk mendapatkan daftar status
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  // Fungsi untuk mengambil antrian berdasarkan adminId
  const fetchQueuesByAdmin = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('token');
    
    try {
      const userResponse = await axios.post(
        `${backendUrl}/auth/current-user`, 
        { token }
      );

      const adminId = userResponse.data.user.userId; // Asumsikan adminId didapatkan dari userId

      const response = await axios.post(`${backendUrl}/queues/admin-queues`, { adminId });
      setQueues(response.data);  // Set data antrian berdasarkan adminId
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };

  // Fungsi untuk mengambil daftar status
  const fetchStatuses = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await axios.get(`${backendUrl}/statuses`); // Endpoint untuk mengambil daftar status
      setStatuses(response.data);
    } catch (error) {
      console.error('Failed to fetch statuses:', error);
    }
  };

  // Fungsi untuk meng-update status
  const handleStatusChange = async (queueId, newStatusId) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      await axios.post(`${backendUrl}/queues/update-status`, { queueId, statusId: newStatusId });
      fetchQueuesByAdmin(); // Refresh data antrian setelah update
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div>
      <LogoutButton />

      {/* Tampilkan daftar antrian */}
      <div style={{ margin: '20px' }}>
        <h2>Your Queues</h2>
        {queues.length > 0 ? (
          <table className={`table ${darkMode ? 'table-dark' : ''}`}>
            <thead>
              <tr>
                <th>Queue No</th>
                <th>User</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {queues.map(queue => (
                <tr key={queue.id}>
                  <td>{queue.queueNo}</td>
                  <td>{queue.userName}</td>
                  <td>
                    <select
                      value={queue.statusId} // Menggunakan statusId sebagai value
                      onChange={(e) => handleStatusChange(queue.id, e.target.value)} // Update status saat dropdown berubah
                    >
                      {statuses.map(status => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{new Date(queue.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
