
import styled from 'styled-components';
import { Container as SharedContainer, FocusButton as SharedFocusButton } from '../../styles/SharedComponents';

export const Container = styled(SharedContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  ${({ $focusMode }) => $focusMode && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.background};
    z-index: 2000;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column; /* Ensure column direction in focus mode */
    align-items: center;
    justify-content: center;
  `}
  
  min-height: 400px;  /* Reduced minimum height */
  padding: 0.5rem;     /* Reduced padding */
  width: 100%;
  max-width: none;

  @media (max-width: 768px) {
    
  }
`;

export const FocusButtonContainer = styled.div`
  position: fixed;
  z-index: 3000;
  transition: all 0.3s ease;
  display: flex;

  @media (max-width: 768px) {
    ${({ $focusMode }) => $focusMode ? `
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      transform: scale(0.9);
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    ` : `
      bottom: 5.5rem;
      right: 1rem;
      transform: scale(0.9);
    `}
  }

  @media (min-width: 769px) {
    bottom: ${({ $focusMode }) => ($focusMode ? '1rem' : '2rem')};
    right: ${({ $focusMode }) => ($focusMode ? '1rem' : '2rem')};
    transform: ${({ $focusMode }) => $focusMode ? 'scale(0.8)' : 'scale(1)'};
  }
`;

export const FocusButton = styled(SharedFocusButton)`
  width: ${({ $focusMode }) => ($focusMode ? '2.5rem' : '3.5rem')};
  height: ${({ $focusMode }) => ($focusMode ? '2.5rem' : '3.5rem')};
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  border: none;
  cursor: pointer;
  font-size: ${({ $focusMode }) => ($focusMode ? '1.25rem' : '1.75rem')};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  opacity: ${({ $focusMode }) => ($focusMode ? '0.8' : '1')};

  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.secondary};
    opacity: 1;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    ${({ $focusMode }) => $focusMode && `
      background: ${({ theme }) => theme.surface};
      color: ${({ theme }) => theme.text};
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.border};
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;

      &:hover {
        background: ${({ theme }) => theme.buttonHover};
        transform: scale(1.05);
      }
    `}
    width: ${({ $focusMode }) => ($focusMode ? '2.25rem' : '3rem')};
    height: ${({ $focusMode }) => ($focusMode ? '2.25rem' : '3rem')};
    font-size: ${({ $focusMode }) => ($focusMode ? '1rem' : '1.5rem')};
  }
`;

export const ProgressIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;