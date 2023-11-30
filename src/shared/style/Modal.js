// Modal.js
import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/cyLoginSuccess.jpg");
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

const Modal = ({ onClose }) => {
  return (
    <ModalBackground>
      <ModalContent>
        {/* Add your modal content here */}
        <h2>Login Successful!</h2>
        <p>Welcome back! You are now logged in.</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
