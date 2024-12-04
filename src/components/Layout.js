import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;  // Reduced padding
  height: 100vh;  // Use full viewport height
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;        // Reduced gap

  @media (min-width: 768px) {
    grid-template-columns: 200px 1fr;  // Adjust sidebar width
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Sidebar = styled.aside`
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.surface};
    padding: 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    z-index: 10;
  }
`;