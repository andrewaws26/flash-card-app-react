import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import ButtonGroup from './components/ButtonGroup';
import Counters from './components/Counters';
import './styles/styles.css';
import { AppContainer, MainContent, Sidebar } from './components/Layout';
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import InstructionsModal from './components/InstructionsModal';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';

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

  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState('exam-4.json');
  const [stats, setStats] = useState({
    totalCards: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });
  const [showInstructions, setShowInstructions] = useState(false);

  const handleToggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleSectionChange = (section) => setCurrentSection(section);

  const handleReset = () => {
    setStats({
      totalCards: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    });
    setCurrentSection('');
    setTimeout(() => setCurrentSection('exam-4.json'), 0);
  };

  const handleStatsUpdate = (total, correct, incorrect) =>
    setStats({ totalCards: total, correctAnswers: correct, incorrectAnswers: incorrect });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Sidebar>
            <ButtonGroup
              onToggleDarkMode={handleToggleDarkMode}
              onSectionChange={handleSectionChange}
              onReset={handleReset}
              onShowInstructions={() => setShowInstructions(true)} // Help button handler
            />
          </Sidebar>
          <MainContent>
            <ContentArea>
              <DynamicHeader />
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
                <Route path="/search" element={<SearchPage />} />
                <Route
                  path="/flashcards"
                  element={
                    <HomePage
                      currentSection={currentSection}
                      onStatsUpdate={handleStatsUpdate}
                      onReset={handleReset}
                    />
                  }
                />
              </Routes>
              <LocationAwareCounters stats={stats} />
            </ContentArea>
          </MainContent>
          {showInstructions && (
            <InstructionsModal onClose={() => setShowInstructions(false)} />
          )}
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

function DynamicHeader() {
  const location = useLocation();
  const headers = {
    '/': 'Welcome to Anatomy Flashcards',
    '/search': 'Search Drug Labels',
    '/flashcards': 'Anatomy Flashcards',
  };
  return <Header>{headers[location.pathname] || 'Anatomy App'}</Header>;
}

function LocationAwareCounters({ stats }) {
  const location = useLocation();
  if (location.pathname === '/flashcards') {
    return <Counters {...stats} />;
  }
  return null;
}

export default App;
