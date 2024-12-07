import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from '../Flashcard'; // Ensure Flashcard is correctly imported
import styled from 'styled-components';
import Spinner from '../Spinner'; // Ensure Spinner is correctly imported
import Counters from '../Counters'; // Ensure Counters is correctly imported

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

// Removed the unused SwipeInstructions component

const ProgressIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const NotificationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 3000;
  text-align: center;
  max-width: 90%;
  width: 400px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

// Remove the ReviewButton styled component
// const ReviewButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: ${({ theme }) => theme.accent};
//   color: ${({ theme }) => theme.surface};
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 1rem;
//   margin-top: 1rem;

//   &:hover {
//     background: ${({ theme }) => theme.secondary};
//   }
// `;

function FlashcardContainer({ currentSection, onStatsUpdate, onReset }) {
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [missedCards, setMissedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [reviewMode, setReviewMode] = useState(false); // Add reviewMode state
  const [notification, setNotification] = useState(''); // Add notification state

  const shuffleArray = useCallback((array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  const loadFlashcards = useCallback(async (section) => {
    if (!section) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/${section}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data format or empty data');
      }
      setFlashcardsData(shuffleArray(data));
      setCurrentCardIndex(0);
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setMissedCards([]);
      setReviewMode(false);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  }, [shuffleArray]);

  useEffect(() => {
    if (currentSection) {
      loadFlashcards(currentSection);
    }
  }, [currentSection, loadFlashcards]);

  useEffect(() => {
    if (flashcardsData.length > 0) {
      onStatsUpdate(flashcardsData.length, correctAnswers, incorrectAnswers);
    }
  }, [flashcardsData.length, correctAnswers, incorrectAnswers, onStatsUpdate]);

  const handleKnowIt = useCallback(() => {
    setCorrectAnswers(prev => prev + 1);
    setCurrentCardIndex(prev => prev + 1);
  }, []);

  const handleDontKnowIt = useCallback(() => {
    setIncorrectAnswers(prev => prev + 1);
    setMissedCards(prev => [...prev, flashcardsData[currentCardIndex]]);
    setCurrentCardIndex(prev => prev + 1);
  }, [currentCardIndex, flashcardsData]);

  const startReviewMode = useCallback(() => {
    if (missedCards.length > 0) {
      setFlashcardsData(missedCards);
      setMissedCards([]);
      setCurrentCardIndex(0);
      setReviewMode(true);
      setNotification('');
    } else {
      setNotification('No missed cards to review!');
    }
  }, [missedCards]);

  useEffect(() => {
    if (currentCardIndex >= flashcardsData.length) {
      if (missedCards.length > 0) {
        setNotification(`Reviewing missed cards. You missed ${missedCards.length} cards.`);
        startReviewMode(); // Automatically start review mode
      } else if (reviewMode && missedCards.length === 0) {
        setNotification('All cards answered correctly!');
      }
    }
  }, [currentCardIndex, flashcardsData.length, missedCards.length, reviewMode, startReviewMode]);

  const handleReset = () => {
    setNotification(''); // Clear notification state
    onReset();
  };

  const toggleFocusMode = () => setFocusMode(!focusMode);

  return (
    <Container $focusMode={focusMode}>
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
      {notification && (
        <NotificationModal>
          <p>{notification}</p>
          <ModalButtons>
            <ModalButton onClick={handleReset}>Reset</ModalButton>
          </ModalButtons>
        </NotificationModal>
      )} {/* Display notification */}
      {loading ? (
        <Spinner />
      ) : flashcardsData.length === 0 ? (
        <div>No flashcards found. Please try again.</div>
      ) : currentCardIndex >= flashcardsData.length ? (
        reviewMode ? (
          <div></div>
        ) : (
          <div></div>
        )
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