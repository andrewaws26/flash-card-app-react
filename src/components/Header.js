import React from 'react'; // Removed useState import
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text}; // Change to theme.text for better visibility
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    justify-content: center; // Center the icons
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: purple; // Ensure color is purple
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const HelpButton = styled(ToggleButton)`
  color: ${({ theme }) => theme.accent};
`;

const Title = styled.h1`
  @media (max-width: 768px) {
    display: none; // Hide title on mobile
  }
`;

// Removed unused SearchInput

const SearchButton = styled(Link)`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    display: none; // Hide the search button on mobile devices
  }

  &:hover {
    color: ${({ theme }) => theme.accent}; // Change color on hover for better visibility
  }
`;

// Removed unused SearchButtonOld

// Removed unused ResultsContainer

// Removed unused SortSelect

// Removed unused SearchFieldSelect

function Header({ isOpen, toggleMenu, toggleDarkMode, onShowInstructions }) {
  return (
    <HeaderContainer>
      <Title>Flashcard App</Title>
      <div>
        <MenuButton onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </MenuButton>
        <ToggleButton onClick={toggleDarkMode}>
          🌙
        </ToggleButton>
        <HelpButton onClick={onShowInstructions}>
          ❔
        </HelpButton>
        <SearchButton to="/search" aria-label="Search">🔍</SearchButton> {/* Add Search Icon Button */}
      </div>
    </HeaderContainer>
  );
}

export default Header;
