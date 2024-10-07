import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

function NavbarComponent({ darkMode, toggleDarkMode }) {
  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
      <Container>
        <Navbar.Brand href="#">Nganthree</Navbar.Brand>
        <Button variant={darkMode ? 'light' : 'dark'} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
