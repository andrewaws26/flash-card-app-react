// src/styles/SharedComponents.js

import styled from 'styled-components';
import { Link } from 'react-router-dom';

// BaseButton: Encapsulates common button styles
const BaseButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.buttonActive : theme.primary)};
  color: ${({ active, theme }) => (active ? theme.surface : theme.text)};
  padding: 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.hoverShadow};
  }

  @media (max-width: 767px) {
    width: auto;
    flex: 1 1 auto;
    min-width: 80px;
    max-width: 150px;
  }
`;

// StyledButton: For regular buttons in the sidebar
export const StyledButton = styled(BaseButton)`
  /* Additional styles specific to StyledButton can be added here if needed */
`;

// StyledLinkButton: For link-based buttons (Search, Flashcards)
export const StyledLinkButton = styled(BaseButton).attrs({ as: Link })`
  text-decoration: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => theme.hoverShadow};
  }
`;

// IconButton: For icon-only buttons (e.g., menu toggle)
export const IconButton = styled(BaseButton)`
  background: none;
  border: none;
  padding: 0.5rem;
  width: auto;
  box-shadow: none;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: scale(1.05);
    box-shadow: none;
  }

  @media (max-width: 767px) {
    padding: 0.4rem;
  }
`;
