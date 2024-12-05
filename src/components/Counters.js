import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: fixed;
  z-index: 1;

  ${({ $focusMode }) => $focusMode && `
    position: fixed;
    top: auto;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    z-index: 1001;
  `}

  @media (max-width: 767px) {
    top: 4rem;  // Position below the header
    bottom: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: auto;
    padding: 1rem;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  min-width: 80px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.background};

  h3 {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    margin-bottom: 0.25rem;
  }

  span {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 767px) {
    min-width: 60px;
    padding: 0.25rem;

    h3 {
      font-size: 0.7rem;
    }

    span {
      font-size: 1rem;
    }
  }

  @media (min-width: 768px) {
    width: 100%;
    min-width: 120px;
    padding: 0.75rem;

    h3 {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 1.5rem;
    }
  }
`;

function Counters({ totalCards, correctAnswers, incorrectAnswers, $focusMode }) {
  return (
    <StatsContainer $focusMode={$focusMode}>
      <StatItem>
        <h3>Total</h3>
        <span>{totalCards}</span>
      </StatItem>
      <StatItem>
        <h3>Correct</h3>
        <span style={{ color: '#22c55e' }}>{correctAnswers}</span>
      </StatItem>
      <StatItem>
        <h3>Incorrect</h3>
        <span style={{ color: '#ef4444' }}>{incorrectAnswers}</span>
      </StatItem>
    </StatsContainer>
  );
}

export default Counters;