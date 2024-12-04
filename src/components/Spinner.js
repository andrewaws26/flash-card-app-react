import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerDiv = styled.div`
  border: 6px solid ${({ theme }) => theme.border};  // Reduced border width
  border-top: 6px solid ${({ theme }) => theme.accent}; // Reduced border width
  border-radius: 50%;
  width: 40px;   // Reduced width
  height: 40px;  // Reduced height
  animation: ${spin} 1s linear infinite;
`;

function Spinner() {
  return <SpinnerDiv />;
}

export default Spinner;