import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerDiv = styled.div`
  border: 8px solid ${({ theme }) => theme.border};
  border-top: 8px solid ${({ theme }) => theme.accent};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

function Spinner() {
  return <SpinnerDiv />;
}

export default Spinner;