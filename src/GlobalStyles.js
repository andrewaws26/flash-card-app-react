import { createGlobalStyle } from 'styled-components';

// Modify the GlobalStyles to correctly apply the theme background

export const GlobalStyles = createGlobalStyle`
  /* Remove @import and use link tag in index.html instead */
  
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;  // Ensure full height
    overflow: hidden;  // Prevent scrolling
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  #root {
    height: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.background};
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.background};  // Ensure this uses the theme background
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
  
  // ...existing code...
`;