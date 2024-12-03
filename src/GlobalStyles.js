import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  body {
    /* ...existing global styles... */
    transition: background-color 0.3s, color 0.3s;
  }

  /* ...additional global styles... */
`;