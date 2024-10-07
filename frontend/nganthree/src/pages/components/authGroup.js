import React, { useState } from 'react';
import { Tabs, Tab, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import SuccessRegisterPopup from './successRegisterPopup';
import ErrorPopup from './errorPopup';
import { useNavigate } from 'react-router-dom';

function AuthGroup() {
  const [key, setKey] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '', isAdmin: '0' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', name: '', isAdmin: '0' });
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State to control error popup
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, loginData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful:', response.data);
      navigate('/'); // Arahkan ke halaman beranda setelah login berhasil
    } catch (err) {
      setErrorMessage('Login failed. Please check your credentials.'); // Set error message
      setShowErrorPopup(true); // Show error popup
      console.error('Error logging in:', err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/auth/register`, registerData);
      console.log('Register successful:', response.data);
      setShowPopup(true);
    } catch (err) {
      setErrorMessage('Registration failed. Please try again.'); // Set error message
      setShowErrorPopup(true); // Show error popup
      console.error('Error registering:', err);
    }
  };

  const handleClosePopup = () => setShowPopup(false); // Function to close the success popup
  const handleCloseErrorPopup = () => setShowErrorPopup(false); // Function to close the error popup

  return (
    <div className="container mt-5">
      <div className="auth-group mx-auto" style={{ maxWidth: '500px' }}>
        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="formLoginUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </Form.Group>

              <Form.Group controlId="formLoginPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="register" title="Register">
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group controlId="formRegisterUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
              </Form.Group>

              <Form.Group controlId="formRegisterPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
              </Form.Group>

              <Form.Group controlId="formRegisterName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Tab>
        </Tabs>

        {/* Success popup */}
        <SuccessRegisterPopup show={showPopup} handleClose={handleClosePopup} />

        {/* Error popup */}
        <ErrorPopup show={showErrorPopup} handleClose={handleCloseErrorPopup} errorMessage={errorMessage} />
      </div>
    </div>
  );
}

export default AuthGroup;
