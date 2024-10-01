import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './pages/components/navbarComponent';
import AuthPage from './pages/authPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} style={{ minHeight: '100vh' }}>
      <NavbarComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <AuthPage />
    </div>
  );
}

export default App;
