import React, { useState, useEffect } from 'react'; // Added useEffect import
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

// Add Backdrop component for focus mode
const Backdrop = styled.div`
  display: ${({ $focusMode }) => ($focusMode ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const FlashcardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;  // Reduced gap
  width: 100%;
  max-width: 600px; // Adjusted max-width
  padding: 0.5rem;   // Reduced padding
  background: ${({ theme }) => theme.surface}; // Set background color to match desired color
  z-index: ${({ $focusMode }) => ($focusMode ? 1000 : 1)};
  position: relative;

  @media (min-width: 1200px) {
    max-width: 800px;
  }

  ${({ $focusMode }) => $focusMode && `
    width: 100%;
    height: 100%;
    max-width: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
      max-width: 90vw;
      max-height: 90vh;
      padding: 1rem;  // Adjusted padding for focus mode
    }
  `}
`;

const Card = styled.div`
  width: 100%;
  perspective: 1000px;
  min-height: 300px;
  margin-bottom: 0; // Remove margin change on flip
  position: relative; // Add position relative

  @media (min-width: 768px) {
    min-height: 400px;
  }

  ${({ $focusMode }) => $focusMode && `
    height: 100%;
    margin: 0;

    @media (min-width: 768px) {
      transform: scale(1.1);
    }
  `}
`;

// Update CardInner for vertical flip animation
const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateX(180deg)' : 'rotateX(0deg)')};
  cursor: pointer;
  min-height: 200px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

// Move CardFace definition above CardFront and CardBack
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%; // Ensure full height coverage
  backface-visibility: hidden;
  display: flex;
  flex-direction: column; // Added flex direction
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.surface}; // Use theme.surface for consistent card color
  transition: background 0.3s ease;

  @media (min-width: 768px) {
    padding: 4rem; // More padding on desktop
  }

  ${({ $focusMode }) => $focusMode && `
    height: 100%;
    
    @media (max-width: 768px) {
      border-radius: 0;
    }
  `}
`;

// Updated CardFront to use vertical flip animation
const CardFront = styled(CardFace)`
  transform: rotateX(0deg);
  backface-visibility: hidden;
`;

// Updated CardBack to use vertical flip animation
const CardBack = styled(CardFace)`
  transform: rotateX(180deg);
  backface-visibility: hidden;
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
  position: fixed; // Change to fixed
  bottom: 0; // Add bottom positioning
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  @media (min-width: 768px) {
    position: absolute; // Use absolute on desktop
    bottom: -5rem; // Position below card
    background: transparent;
    box-shadow: none;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  max-width: 200px;
  background: ${({ $correct, theme }) => $correct ? theme.success : theme.error}; // Changed from theme.accent to theme.error
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${({ $correct, theme }) => $correct ? theme.success : theme.error}; // Changed from theme.secondary to theme.error
  }

  @media (max-width: 768px) {
    max-width: none;
  }
`;

// Remove the unused HintText component
// const HintText = styled.small`...`;

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

// Update the component to handle focus mode prop
function Flashcard({ data, onKnowIt, onDontKnowIt, $focusMode }) {
  const [flipped, setFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    setFlipped(false); // Ensure the question side is shown when a new card is loaded
  }, [data]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipeDirection(eventData.deltaX > 0 ? 'right' : 'left');
    },
    onSwipedLeft: () => {
      onDontKnowIt();
      setSwipeDirection(null);
    },
    onSwipedRight: () => {
      onKnowIt();
      setSwipeDirection(null);
    },
    onSwiped: () => {
      setSwipeDirection(null);
    },
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
    delta: 10,
    swipeThreshold: 40,
  });

  return (
    <>
      <Backdrop $focusMode={$focusMode} />
      <FlashcardWrapper {...handlers} $focusMode={$focusMode}>
        <Card $flipped={flipped} $focusMode={$focusMode}>
          <CardInner
            $flipped={flipped}
            onClick={handleFlip}
          >
            <CardFront $focusMode={$focusMode}>
              <CardContent>
                <Definition>{data.definition}</Definition>
                <FlipIndicator>↻</FlipIndicator>
              </CardContent>
            </CardFront>
            <CardBack $focusMode={$focusMode}>
              <CardContent>
                <Term>{data.term}</Term>
                <FlipIndicator>↻</FlipIndicator> {/* Corrected closing tag */}
              </CardContent>
            </CardBack>
          </CardInner>
          {swipeDirection && (
            <>
              <SwipeHint direction={swipeDirection} show={true}>
                {swipeDirection === 'left' ? '←' : '→'}
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
              setSwipeDirection(null);
            }}
          >
            Know It
          </ActionButton>
          <ActionButton
            onClick={(e) => {
              e.stopPropagation();
              onDontKnowIt();
              setSwipeDirection(null);
            }}
          >
            Don't Know It
          </ActionButton>
        </ButtonContainer>
      </FlashcardWrapper>
    </>
  );
}

export default Flashcard;