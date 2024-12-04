import React, { useState } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const FlashcardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px; // Increased from 600px
  padding: 1rem;

  @media (min-width: 1200px) {
    max-width: 1000px; // Even larger for big screens
  }
`;

const Card = styled.div`
  width: 100%;
  perspective: 1000px;
  margin-bottom: ${({ $flipped }) => ($flipped ? '4rem' : '0')};
  min-height: 300px; // Increased minimum height

  @media (min-width: 768px) {
    min-height: 400px; // Taller on desktop
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'none')};
  cursor: pointer;
  min-height: 200px; // Ensure minimum height for content
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem; // Increased padding
  border-radius: 1rem;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};

  @media (min-width: 768px) {
    padding: 4rem; // More padding on desktop
  }
`;

const CardFront = styled(CardFace)`
  // ...existing styles...
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  // ...existing styles...
`;

const Definition = styled.p`
  font-size: 1.5rem; // Increased font size
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.75rem; // Larger text on desktop
  }
`;

const Term = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.accent};
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2rem; // Larger text on desktop
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.background};
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  max-width: 200px;
  background: ${({ $correct, theme }) => $correct ? theme.success : theme.accent};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $correct, theme }) => $correct ? theme.success : theme.secondary};
  }

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const HintText = styled.small`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 0.875rem;
  transition: opacity 0.3s;
`;

const FlipIndicator = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.accent};
  opacity: 0.5;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SwipeHint = styled.div`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'};
  transform: translateY(-50%);
  opacity: ${({ show }) => (show ? '0.5' : '0')};
  transition: opacity 0.3s;
  color: ${({ theme, direction }) => 
    direction === 'left' ? theme.swipeLeft : theme.swipeRight};
  font-size: 2rem;
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;

function Flashcard({ data, onKnowIt, onDontKnowIt }) {
  const [flipped, setFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeAmount, setSwipeAmount] = useState(0);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (!flipped) return; // Only allow swipe when card is flipped
      const amount = Math.abs(eventData.deltaX);
      setSwipeAmount(Math.min(amount, 100));
      setSwipeDirection(eventData.deltaX > 0 ? 'right' : 'left');
    },
    onSwipedLeft: () => {
      if (flipped) {
        onDontKnowIt();
        setFlipped(false);
      }
    },
    onSwipedRight: () => {
      if (flipped) {
        onKnowIt();
        setFlipped(false);
      }
    },
    onSwiped: () => {
      setSwipeAmount(0);
      setSwipeDirection(null);
    },
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
    delta: 10,
    swipeThreshold: 40,
  });

  return (
    <FlashcardWrapper {...handlers}>
      <Card $flipped={flipped}>
        <CardInner $flipped={flipped} onClick={handleFlip}>
          <CardFront>
            <CardContent>
              <Definition>{data.definition}</Definition>
              <HintText>Tap to reveal answer</HintText>
              <FlipIndicator>↻</FlipIndicator>
            </CardContent>
          </CardFront>
          <CardBack>
            <CardContent>
              <Term>{data.term}</Term>
              <HintText>Tap to flip back</HintText>
              <FlipIndicator>↻</FlipIndicator>
            </CardContent>
          </CardBack>
        </CardInner>
        {flipped && (
          <>
            <SwipeHint direction="left" show={swipeDirection === 'left'}>
              ←
            </SwipeHint>
            <SwipeHint direction="right" show={swipeDirection === 'right'}>
              →
            </SwipeHint>
          </>
        )}
      </Card>
      <ButtonContainer>
        <ActionButton
          $correct
          onClick={(e) => {
            e.stopPropagation();
            onKnowIt();
            setFlipped(false);
          }}
        >
          Know It
        </ActionButton>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onDontKnowIt();
            setFlipped(false);
          }}
        >
          Don't Know It
        </ActionButton>
      </ButtonContainer>
    </FlashcardWrapper>
  );
}

export default Flashcard;