import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
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
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
`;

function Header({ isOpen, toggleMenu }) {
  return (
    <HeaderContainer>
      <h1>Flashcard App</h1>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </MenuButton>
    </HeaderContainer>
  );
}

export default Header;
