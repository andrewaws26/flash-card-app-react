
import React from 'react';

const ExampleComponent = () => (
  <div>
    <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" />
    <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/styles/custom.css`} />
  </div>
);

export default ExampleComponent;