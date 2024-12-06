import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../styles/SharedComponents';
import Header from './Header'; // Import the Header component

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
  min-height: 100vh;
  position: fixed;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  top: 4rem;
  transition: left 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${({ isOpen, theme }) => (isOpen ? `4px 0 12px ${theme.shadow}` : 'none')};
  border-right: 1px solid ${({ theme }) => theme.border};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ $isOpen }) => ($isOpen ? '0' : '-200px')};
    top: 4rem;
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

  return (
    <>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer $isOpen={isOpen}>
        <ButtonGroupContainer>
          <StyledButton onClick={onToggleDarkMode}>
            Toggle Dark Mode
          </StyledButton>
          <StyledButton onClick={onReset}>
            Reset
          </StyledButton>
          <StyledButton onClick={onShowInstructions}>
            Instructions
          </StyledButton>
          {sections.map((section) => (
            <StyledButton
              key={section.value}
              onClick={() => onSectionChange(section.value)}
            >
              {section.label}
            </StyledButton>
          ))}
        </ButtonGroupContainer>
      </SidebarContainer>
    </>
  );
}

export default ButtonGroup;