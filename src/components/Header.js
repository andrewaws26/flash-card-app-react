// src/components/Header.js

import React from 'react';
import styled from 'styled-components';
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaQuestionCircle,
  FaSearch,
  FaBook,
} from 'react-icons/fa';
import { IconButton, StyledLinkButton } from '../styles/SharedComponents';

// Header Container
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1100; /* Higher than sidebar */
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

// Title styled component
const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};

  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

// Navigation Container
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

// Header Component
function Header({
  isMenuOpen,
  toggleMenu,
  toggleDarkMode,
  showInstructions,
}) {
  return (
    <HeaderContainer>
      <Title>Anatomy Flashcards</Title>
      <Nav>
        {/* Menu Button */}
        <IconButton
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          title={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </IconButton>

        {/* Dark Mode Toggle */}
        <IconButton
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          <FaMoon />
        </IconButton>

        {/* Help Button */}
        <IconButton
          onClick={showInstructions}
          aria-label="Help"
          title="Help"
        >
          <FaQuestionCircle />
        </IconButton>

        {/* Search and Flashcards as StyledLinkButton */}
        <StyledLinkButton className="hide-on-mobile" to="/search" aria-label="Search" title="Search">
          <FaSearch style={{ marginRight: '0.5rem' }} />
          <span className="link-text">Search</span>
        </StyledLinkButton>
        <StyledLinkButton className="hide-on-mobile" to="/flashcards" aria-label="Flashcards" title="Go to Flashcards">
          <FaBook style={{ marginRight: '0.5rem' }} />
          <span className="link-text">Flashcards</span>
        </StyledLinkButton>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;