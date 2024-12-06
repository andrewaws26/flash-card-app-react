import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';
import styled from 'styled-components';
import Spinner from './Spinner';
import Counters from './Counters';  // Verify this import path is correct

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${({ $focusMode }) => $focusMode && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.background};
    z-index: 2000;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column; /* Ensure column direction in focus mode */
    align-items: center;
    justify-content: center;
  `}
  
  min-height: 400px;  /* Reduced minimum height */
  padding: 0.5rem;     /* Reduced padding */
  width: 100%;
  max-width: none;

  @media (max-width: 768px) {
    
  }
`;

const FocusButtonContainer = styled.div`
  position: fixed;
  z-index: 3000;
  transition: all 0.3s ease;
  display: flex;

  @media (max-width: 768px) {
    ${({ $focusMode }) => $focusMode ? `
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      transform: scale(0.9);
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    ` : `
      bottom: 5.5rem;
      right: 1rem;
      transform: scale(0.9);
    `}
  }

  @media (min-width: 769px) {
    bottom: ${({ $focusMode }) => ($focusMode ? '1rem' : '2rem')};
    right: ${({ $focusMode }) => ($focusMode ? '1rem' : '2rem')};
    transform: ${({ $focusMode }) => $focusMode ? 'scale(0.8)' : 'scale(1)'};
  }
`;

const FocusButton = styled.button`
  width: ${({ $focusMode }) => ($focusMode ? '2.5rem' : '3.5rem')};
  height: ${({ $focusMode }) => ($focusMode ? '2.5rem' : '3.5rem')};
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  cursor: pointer;
  font-size: ${({ $focusMode }) => ($focusMode ? '1.25rem' : '1.75rem')};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  opacity: ${({ $focusMode }) => ($focusMode ? '0.8' : '1')};

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.secondary};
    opacity: 1;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    ${({ $focusMode }) => $focusMode && `
      background: ${({ theme }) => theme.surface};
      color: ${({ theme }) => theme.text};
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.border};
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;

      &:hover {
        background: ${({ theme }) => theme.buttonHover};
        transform: scale(1.05);
      }
    `}
    width: ${({ $focusMode }) => ($focusMode ? '2.25rem' : '3rem')};
    height: ${({ $focusMode }) => ($focusMode ? '2.25rem' : '3rem')};
    font-size: ${({ $focusMode }) => ($focusMode ? '1rem' : '1.5rem')};
  }
`;

// const SwipeInstructions = styled.div`
//   // ...existing styles...
// `;

const ProgressIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

function FlashcardContainer({ currentSection, onStatsUpdate }) {
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [missedCards, setMissedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const loadFlashcards = useCallback(async (section) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/${section}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFlashcardsData(shuffleArray(data));
      setCurrentCardIndex(0);
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setMissedCards([]);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentSection) loadFlashcards(currentSection);
  }, [currentSection, loadFlashcards]);

  useEffect(() => {
    onStatsUpdate(flashcardsData.length, correctAnswers, incorrectAnswers);
  }, [flashcardsData.length, correctAnswers, incorrectAnswers, onStatsUpdate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKnowIt = () => {
    setCorrectAnswers(correctAnswers + 1);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handleDontKnowIt = () => {
    setIncorrectAnswers(incorrectAnswers + 1);
    setMissedCards([...missedCards, flashcardsData[currentCardIndex]]);
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const toggleFocusMode = () => setFocusMode(!focusMode);

  return (
    <Container $isMobile={isMobile} $focusMode={focusMode}>
      <FocusButtonContainer $focusMode={focusMode}>
        <FocusButton onClick={toggleFocusMode} $focusMode={focusMode}>
          <span>{focusMode ? '⇲' : '⇱'}</span>
        </FocusButton>
      </FocusButtonContainer>
      <ProgressIndicator>
        {currentCardIndex + 1} of {flashcardsData.length}
      </ProgressIndicator>
      {!focusMode && (
        <Counters 
          totalCards={flashcardsData.length}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          $focusMode={focusMode}
        />
      )}
      {loading ? (
        <Spinner />
      ) : flashcardsData.length === 0 ? (
        <div>No flashcards found. Please try again.</div>
      ) : currentCardIndex >= flashcardsData.length ? (
        <Spinner />
      ) : flashcardsData.length === 0 ? (
        <div>No flashcards found. Please try again.</div>
      ) : currentCardIndex >= flashcardsData.length ? (
        <div>All cards completed! Click Reset to start over.</div>
      ) : (
        <Flashcard
          key={currentCardIndex} // Add unique key to reset Flashcard state
          data={flashcardsData[currentCardIndex]}
          onKnowIt={handleKnowIt}
          onDontKnowIt={handleDontKnowIt}
          $focusMode={focusMode}  // Pass the focusMode prop to Flashcard
        />
      )}
    </Container>
  );
}

export default FlashcardContainer;
