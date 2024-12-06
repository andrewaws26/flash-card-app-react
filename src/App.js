import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; // Removed GlobalStyle import
import ButtonGroup from './components/ButtonGroup';
import Counters from './components/Counters';
import FlashcardContainer from './components/FlashcardContainer';
import './styles/styles.css';
import { AppContainer, MainContent, Sidebar } from './components/Layout';
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles'; // Ensure only GlobalStyles is imported
import InstructionsModal from './components/InstructionsModal'; // Create this component

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin: 1rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.background};
    padding: 1rem;
    z-index: 2;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
   
    position: relative; // Add for absolute positioning context
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('exam-4.json');
  const [totalCards, setTotalCards] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSectionChange = (section) => {
    console.log('Changing section to:', section);
    setCurrentSection(section);
  };

  const handleReset = () => {
    console.log('Reset button clicked');
    console.log('Current state before reset:', {
      currentSection,
      totalCards,
      correctAnswers,
      incorrectAnswers
    });

    // Force a reload by changing section to empty and back
    setCurrentSection('');
    setTimeout(() => {
      setCurrentSection('exam-4.json');
    }, 0);

    setTotalCards(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);

    console.log('Reset state applied');
  };

  const handleStatsUpdate = (total, correct, incorrect) => {
    setTotalCards(total);
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles /> {/* Use only GlobalStyles */}
      <AppContainer basename={process.env.PUBLIC_URL}>
        <Sidebar>
          <ButtonGroup
            onToggleDarkMode={handleToggleDarkMode}
            onSectionChange={handleSectionChange}
            onReset={handleReset}
            onShowInstructions={handleShowInstructions}
          />
        </Sidebar>
        <MainContent>
          <ContentArea>
            <Header>Anatomy Flashcards</Header>
            <FlashcardContainer 
              currentSection={currentSection}
              onStatsUpdate={handleStatsUpdate}
            />
          </ContentArea>
          <Counters 
            totalCards={totalCards}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
          />
        </MainContent>
      </AppContainer>
      {showInstructions && (
        <InstructionsModal onClose={handleCloseInstructions} />
      )}
    </ThemeProvider>
  );
}

export default App;