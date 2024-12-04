import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';
import styled from 'styled-components';
import Spinner from './Spinner';

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
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.background};
    z-index: 1000;
    padding: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      width: 80vw;
      height: 80vh;
      margin: auto;
      border-radius: 10px;
      box-shadow: ${({ theme }) => theme.shadow};
      transform: scale(1.1); /* Add scaling for desktop */
    }
  `}
  min-height: 300px;  // Reduced minimum height
  padding: 0.5rem;     // Reduced padding
  width: 100%;
  max-width: none;
`;

const FocusButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1001;
  transition: transform 0.3s ease;
  transform: ${({ $focusMode }) => $focusMode ? 'scale(1.2)' : 'scale(1)'};

  @media (max-width: 768px) {
    bottom: calc(100px + 1rem);
    right: 1rem;
  }
`;

const FocusButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.secondary};
  }
`;

const SwipeInstructions = styled.div`
  text-align: center;
  margin: 1rem 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  padding: 0.5rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

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
  // Remove the cardRevealed state
  // const [cardRevealed, setCardRevealed] = useState(false);
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
      // setCardRevealed(false);
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
    // setCardRevealed(false);
  };

  const handleDontKnowIt = () => {
    setIncorrectAnswers(incorrectAnswers + 1);
    setMissedCards([...missedCards, flashcardsData[currentCardIndex]]);
    setCurrentCardIndex(currentCardIndex + 1);
    // setCardRevealed(false);
  };

  const toggleFocusMode = () => setFocusMode(!focusMode);

  return (
    <Container $isMobile={isMobile} $focusMode={focusMode}>
      <FocusButtonContainer>
        <FocusButton onClick={toggleFocusMode}>
          {focusMode ? '−' : '+'}
        </FocusButton>
      </FocusButtonContainer>
      <ProgressIndicator>
        {currentCardIndex + 1} of {flashcardsData.length}
      </ProgressIndicator>
      {isMobile && (
        <SwipeInstructions>
          After revealing the answer, swipe right if you know it, left if you don't.
        </SwipeInstructions>
      )}
      {loading ? (
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
        />
      )}
    </Container>
  );
}

export default FlashcardContainer;
