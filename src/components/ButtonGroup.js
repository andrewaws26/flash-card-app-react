// src/components/ButtonGroup.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton, StyledLinkButton } from '../styles/SharedComponents';
import Header from './Header';
import { FaBook, FaSearch } from 'react-icons/fa';
import FocusLock from 'react-focus-lock';

// Sidebar Container
const SidebarContainer = styled.aside`
  background: ${({ theme }) => theme.surface};
  padding: 2rem 1rem;
  width: 250px;
  min-height: calc(100vh - 4rem); /* Adjust height to not overlap with header */
  position: fixed;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  top: 4rem; /* Ensure it starts below the header */
  transition: left 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ $isOpen, theme }) => ($isOpen ? `4px 0 12px ${theme.shadow}` : 'none')};
  border-right: 1px solid ${({ theme }) => theme.border};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-200px')};
  }
`;

// Overlay for Sidebar
const Overlay = styled.div`
  position: fixed;
  top: 4rem; /* Start below header */
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 999;

  ${({ $isOpen }) =>
    $isOpen &&
    `
      backdrop-filter: blur(5px);
    `}
`;

// Button Group Container inside Sidebar
const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 767px) {
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

function ButtonGroup({ onSectionChange, onReset, onToggleDarkMode, onShowInstructions }) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { label: 'Exam 4', value: 'exam-4.json' },
    // Add more sections as needed
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOptionClick = (callback) => {
    callback();
    setIsOpen(false);
  };

  return (
    <>
      <Header 
        isMenuOpen={isOpen} 
        toggleMenu={toggleMenu} 
        toggleDarkMode={onToggleDarkMode}
        showInstructions={onShowInstructions}
      />
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      {isOpen && (
        <FocusLock>
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

              {/* Use StyledLinkButton for Flashcards and Search */}
              <StyledLinkButton to="/flashcards" aria-label="Flashcards" title="Go to Flashcards" onClick={() => setIsOpen(false)}>
                <FaBook style={{ marginRight: '0.5rem' }} />
                Flashcards
              </StyledLinkButton>
              <StyledLinkButton to="/search" aria-label="Search" title="Search" onClick={() => setIsOpen(false)}>
                <FaSearch style={{ marginRight: '0.5rem' }} />
                Search
              </StyledLinkButton>
            </ButtonGroupContainer>
          </SidebarContainer>
        </FocusLock>
      )}
    </>
  );
}

export default ButtonGroup;
