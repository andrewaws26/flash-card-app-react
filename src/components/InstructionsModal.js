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
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

// Remove the CloseButton styled component

const ModalContainer = styled.div`
  // ...existing code...
`;

function InstructionsModal({ onClose }) {
  return (
    <ModalContainer>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>Instructions</h2>
          <p>
            Tap on a flashcard to reveal the answer. Swipe right if you know it, swipe left if you don't.
          </p>
          <p>
            You will review all the missed cards until you get them right. Keep practicing until all cards are answered correctly.
          </p>
          <CloseButton onClick={onClose}>Got it</CloseButton>
        </ModalContent>
      </ModalOverlay>
    </ModalContainer>
  );
}

export default InstructionsModal;