import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; // Ensure lightTheme and darkTheme are correctly imported
import ButtonGroup from './components/ButtonGroup'; // Ensure ButtonGroup is correctly imported
import Counters from './components/Counters'; // Ensure Counters is correctly imported
import './styles/styles.css';
import { AppContainer, MainContent, Sidebar } from './components/Layout'; // Ensure Layout components are correctly imported
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles'; // Ensure GlobalStyles is correctly imported
import InstructionsModal from './components/InstructionsModal'; // Ensure InstructionsModal is correctly imported
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage'; // Import SearchPage
import HomePage from './pages/HomePage'; // Import HomePage

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
      <Router>
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
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <HomePage 
                      currentSection={currentSection}
                      onStatsUpdate={handleStatsUpdate}
                      onReset={handleReset}
                    />
                  } 
                />
                <Route path="/search" element={<SearchPage />} /> {/* Add SearchPage Route */}
              </Routes>
              <LocationAwareCounters 
                totalCards={totalCards}
                correctAnswers={correctAnswers}
                incorrectAnswers={incorrectAnswers}
              />
            </ContentArea>
          </MainContent>
        </AppContainer>
      </Router>
      {showInstructions && (
        <InstructionsModal onClose={handleCloseInstructions} />
      )}
    </ThemeProvider>
  );
}

function LocationAwareCounters({ totalCards, correctAnswers, incorrectAnswers }) {
  const location = useLocation();
  return location.pathname === '/' ? (
    <Counters 
      totalCards={totalCards}
      correctAnswers={correctAnswers}
      incorrectAnswers={incorrectAnswers}
    />
  ) : null;
}

export default App;