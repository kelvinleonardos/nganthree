import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QueueForm({ onClose }) {
  const [admins, setAdmins] = useState([]);
  const [queueNo, setQueueNo] = useState(''); 
  const [userId, setUserId] = useState('');  
  const [adminId, setAdminId] = useState(''); 

  // Fetch admins and current user on mount
  useEffect(() => {
    const fetchCurrentUserAndAdmins = async () => {
      const token = localStorage.getItem('token');
      try {
        const userResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/current-user`, { token });
        setUserId(userResponse.data.user.userId || "");

        const adminResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/admins`);
        setAdmins(adminResponse.data);

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchCurrentUserAndAdmins();
  }, []);

  // Fetch the queue number when the adminId changes
  useEffect(() => {
    if (adminId) {
      const fetchQueueNumber = async () => {
        try {
          const queueResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/queues/next-number`, { adminId });
          setQueueNo(queueResponse.data.nextNumber || ""); // Update queue number based on admin selection
        } catch (error) {
          console.error('Failed to fetch queue number:', error);
        }
      };

      fetchQueueNumber();
    }
  }, [adminId]); // Trigger this effect whenever adminId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/queues/create-queue`, {
        queueNo,
        userId,
        adminId,
        statusId: 0,
      });
      onClose(); // Close the form after submission
    } catch (error) {
      console.error('Error creating queue:', error);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Register Queue</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="queueNo" className="form-label">Queue No</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-light"
                  id="queueNo"
                  value={queueNo}
                  readOnly // Read-only because it's auto-populated based on admin
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">User ID</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-light"
                  id="userId"
                  value={userId}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="adminId" className="form-label">Admin</label>
                <select
                  className="form-select bg-dark text-light border-light"
                  id="adminId"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)} // Update the selected admin
                  required
                >
                  <option value="">Select Admin</option>
                  {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueueForm;
