import React, { useState } from 'react';
import { Tabs, Tab, Form, Button } from 'react-bootstrap';

function AuthGroup() {
  const [key, setKey] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', name: '' });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register Data:', registerData);
  };

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
      </div>
    </div>
  );
}

export default AuthGroup;
