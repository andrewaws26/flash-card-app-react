import React, { useState } from 'react';
import styled from 'styled-components';

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

const StyledButton = styled.button`
  background: ${({ active, theme }) => (active ? theme.accent : theme.surface)};
  color: ${({ active, theme }) => (active ? theme.surface : theme.text)};
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: all 0.2s ease, background-color 0.3s, transform 0.3s;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.hoverShadow};
  }

  @media (max-width: 767px) {
    width: auto;
    flex: 1 1 auto;
    min-width: 100px;
    max-width: 200px;
  }
`;

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 2rem 1rem;
  width: 250px;
  min-height: 100vh;
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  top: 0;
  transition: left 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 1000;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-200px')};
  }
`;

const MenuToggle = styled.button`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.surface};
  position: fixed;
  top: 1rem;
  left: ${({ isOpen }) => (isOpen ? '250px' : '1rem')};
  transition: left 0.3s ease;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    left: ${({ isOpen }) => (isOpen ? '200px' : '1rem')};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  pointer-events: ${({ isOpen }) => isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  z-index: 999;

  ${({ isOpen }) => isOpen && `
    backdrop-filter: blur(5px);
  `}
`;

function ButtonGroup({ onSectionChange, onReset, onToggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { label: 'Ch 1 Study Guide', value: 'ch-one-study-guide.json' },
    { label: 'Ch 8', value: 'flashcards-ch-eight.json' },
    { label: 'Ch 9', value: 'flashcards-ch-nine.json' },
    { label: 'Ch 10', value: 'flashcards-ch-ten.json' },
    { label: 'Sg 3', value: 'flashcards-sg-three.json' },
    { label: 'Lab 11', value: 'flashcards-lab-eleven.json' },
    { label: 'Lab 12', value: 'flashcards-lab-twelve.json' },
  ];

  return (
    <>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <MenuToggle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </MenuToggle>
      <SidebarContainer isOpen={isOpen}>
        <ButtonGroupContainer>
          <StyledButton onClick={onToggleDarkMode}>
            Toggle Dark Mode
          </StyledButton>
          <StyledButton onClick={onReset}>
            Reset
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