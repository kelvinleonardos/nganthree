import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Menghapus token
    navigate('/auth');  // Mengarahkan kembali ke halaman login
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#f50057',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        fontSize: '24px',
      }}
    >
      &#x2716; {/* Icon "X" untuk logout */}
    </button>
  );
}

export default LogoutButton;
