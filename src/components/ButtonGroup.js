import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../styles/SharedComponents';
import Header from './Header'; // Ensure Header is correctly imported
import { Link } from 'react-router-dom';

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 767px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 2rem 1rem;
  width: 250px;
  min-height: calc(100vh - 4rem); // Adjust height to not overlap with header
  position: fixed;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  top: 4rem; // Ensure it starts below the header
  margin-top: 4rem; // Add margin to ensure it does not overlap with the header
  transition: left 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ isOpen, theme }) => (isOpen ? `4px 0 12px ${theme.shadow}` : 'none')};
  border-right: 1px solid ${({ theme }) => theme.border};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-200px')};
    top: 4rem; // Ensure it starts below the header
    margin-top: 4rem; // Add margin to ensure it does not overlap with the header
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 999;

  ${({ isOpen }) => isOpen && `
    backdrop-filter: blur(5px);
  `}
`;

function ButtonGroup({ onSectionChange, onReset, onToggleDarkMode, onShowInstructions }) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { label: 'Exam 4', value: 'exam-4.json' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOptionClick = (callback) => {
    callback();
    setIsOpen(false);
  };

  return (
    <>
      <Header 
        isOpen={isOpen} 
        toggleMenu={toggleMenu} 
        toggleDarkMode={onToggleDarkMode}
        onShowInstructions={onShowInstructions}
      />
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer $isOpen={isOpen}>
        <ButtonGroupContainer>
          <StyledButton onClick={() => handleOptionClick(onToggleDarkMode)}>
            Toggle Dark Mode
          </StyledButton>
          <StyledButton onClick={() => handleOptionClick(onReset)}>
            Reset
          </StyledButton>
          <StyledButton onClick={() => handleOptionClick(onShowInstructions)}>
            Instructions
          </StyledButton>
          {sections.map((section) => (
            <StyledButton
              key={section.value}
              onClick={() => handleOptionClick(() => onSectionChange(section.value))}
            >
              {section.label}
            </StyledButton>
          ))}
          <Link to="/" onClick={() => setIsOpen(false)}> {/* Add Flashcards Button */}
            <StyledButton>Flashcards</StyledButton>
          </Link>
          <Link to="/search" onClick={() => setIsOpen(false)}>
            <StyledButton>Search</StyledButton> {/* Add Search Button */}
          </Link>
        </ButtonGroupContainer>
      </SidebarContainer>
    </>
  );
}

export default ButtonGroup;