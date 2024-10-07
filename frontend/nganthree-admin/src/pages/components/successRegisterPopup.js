import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function SuccessRegisterPopup({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registration Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have successfully registered!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessRegisterPopup;
