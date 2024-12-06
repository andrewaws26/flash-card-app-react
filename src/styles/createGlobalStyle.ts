
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

const GlobalStyle = createGlobalStyle`
  // ...existing code...
`;

function GlobalStyleComponent() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="path/to/stylesheet.css" />
      </Helmet>
      <GlobalStyle />
    </>
  );
}

export default GlobalStyleComponent;