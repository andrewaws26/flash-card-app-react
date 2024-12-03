
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const SpinnerElement = styled.div`
  border: 4px solid ${({ theme }) => theme.border};
  border-top: 4px solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <SpinnerElement />
    </SpinnerContainer>
  );
}

export default Spinner;