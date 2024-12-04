import React, { useState } from 'react';
import styled from 'styled-components';

const FlashcardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 600px;
  padding: 1rem;
`;

const Card = styled.div`
  width: 100%;
  perspective: 1000px;
  margin-bottom: 1rem;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'none')};
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
  padding: 2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const CardFront = styled(CardFace)`
  // ...existing styles...
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  // ...existing styles...
`;

const Definition = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Term = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.accent};
  text-align: center;
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
  background: ${({ correct, theme }) => correct ? theme.success : theme.accent};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: ${({ correct, theme }) => correct ? theme.success : theme.secondary};
  }

  @media (max-width: 768px) {
    max-width: none;
  }
`;

function Flashcard({ data, onKnowIt, onDontKnowIt }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <FlashcardWrapper>
      <Card flipped={flipped}>
        <CardInner flipped={flipped} onClick={handleFlip}>
          <CardFront>
            <Definition>{data.definition}</Definition>
            {!flipped && <small>Tap to reveal the answer</small>}
          </CardFront>
          <CardBack>
            <Term>{data.term}</Term>
            {flipped && <small>Tap to go back</small>}
          </CardBack>
        </CardInner>
      </Card>
      <ButtonContainer>
        <ActionButton
          correct
          onClick={(e) => {
            e.stopPropagation();
            onKnowIt();
          }}
        >
          Know It
        </ActionButton>
        <ActionButton
          onClick={(e) => {
            e.stopPropagation();
            onDontKnowIt();
          }}
        >
          Don't Know It
        </ActionButton>
      </ButtonContainer>
    </FlashcardWrapper>
  );
}

export default Flashcard;