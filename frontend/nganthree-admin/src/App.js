import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './pages/components/navbarComponent';
import AuthPage from './pages/authPage';
import HomePage from './pages/homePage'; // Example of another page

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} style={{ minHeight: '100vh' }}>
        <NavbarComponent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
