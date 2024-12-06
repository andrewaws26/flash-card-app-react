
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  margin: 5% auto;
  max-width: 600px;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

function InstructionsModal({ onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Instructions</h2>
        <p>
          After revealing the answer, swipe right if you know it, left if you don't.
          {/* ...additional instructions... */}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
}

export default InstructionsModal;