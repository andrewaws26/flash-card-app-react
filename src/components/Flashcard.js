import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  perspective: 1000px;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'none')};
  cursor: pointer;
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

function Flashcard({ data, focusMode }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Card>
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
  );
}

export default Flashcard;