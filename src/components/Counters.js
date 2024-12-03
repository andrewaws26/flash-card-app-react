import React from 'react';
import styled from 'styled-components';

const CountersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const CounterItem = styled.div`
  margin: 0 15px;
  text-align: center;

  p {
    margin: 0;
  }

  span {
    color: ${({ theme }) => theme.accent};
    font-weight: bold;
    font-size: 1.2em;
  }
`;

// eslint-disable-next-line no-unused-vars
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

// eslint-disable-next-line no-unused-vars
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