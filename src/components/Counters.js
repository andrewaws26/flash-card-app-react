import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: fixed; /* Changed from sticky to fixed */
  bottom: 1rem;     /* Position at the bottom with some margin */
  right: 1rem;      /* Align to the right */
  z-index: 1000;    /* Ensure it stays above other elements */
  
  @media (min-width: 1200px) {
    top: 1rem;        /* Position at the top on larger screens */
    bottom: auto;     
    right: 1rem;      /* Maintain alignment to the right */
    grid-template-columns: 1fr;
    height: fit-content;
    width: 150px;  
    margin-left: 0;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.background};

  h3 {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.accent};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.border};
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: ${({ theme }) => theme.accent};
  transition: width 0.3s ease;
`;

function Counters({ totalCards, correctAnswers, incorrectAnswers }) {
  const progress = totalCards ? ((correctAnswers + incorrectAnswers) / totalCards) * 100 : 0;

  return (
    <StatsContainer>
      <StatItem>
        <h3>Total Cards</h3>
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
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
    </StatsContainer>
  );
}

export default Counters;