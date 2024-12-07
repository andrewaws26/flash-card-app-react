import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

const FeatureInstruction = styled.p`
  margin-bottom: 1rem;
`;

function InstructionsModal({ onClose }) {
  // Get the current route
  const location = useLocation();

  // Map of routes to features and their instructions
  const routeInstructions = {
    '/flashcards': 'Tap on a flashcard to reveal the answer. Swipe right if you know it, swipe left if you don’t. You will review all the missed cards until you get them right.',
    '/search': 'Enter the name of a drug in the search bar to view its FDA label. Use autocomplete suggestions for quick selection. Click on a result to view detailed information like dosage, warnings, and adverse reactions.',
  };

  // Determine the current instruction based on the route
  const currentInstruction = routeInstructions[location.pathname];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Instructions</h2>
        {currentInstruction ? (
          <FeatureInstruction>{currentInstruction}</FeatureInstruction>
        ) : (
          <p>No instructions available for this page.</p>
        )}
        <CloseButton onClick={onClose}>Got it</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default InstructionsModal;
