
import styled from 'styled-components';

export const StyledButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.buttonActive : theme.background)};
  color: ${({ active, theme }) => (active ? theme.surface : theme.text)};
  padding: 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.hoverShadow};
  }

  @media (max-width: 767px) {
    width: auto;
    flex: 1 1 auto;
    min-width: 80px;
    max-width: 150px;
  }
`;

export const Container = styled.div`
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

export const FocusButton = styled.button`
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

// Add other shared styled components as needed