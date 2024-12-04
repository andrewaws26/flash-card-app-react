import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease;
  }

  /* Add smooth transitions for buttons and interactive elements */
  button, .focus-button {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  button:hover, .focus-button:hover {
    transform: translateY(-2px);
  }
`;