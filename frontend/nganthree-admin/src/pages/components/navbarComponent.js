import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function NavbarComponent({ darkMode, toggleDarkMode }) {
  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
        <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
