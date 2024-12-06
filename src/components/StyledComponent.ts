
import styled from 'styled-components';

const StyledComponent = styled.div<{ $isOpen: boolean }>`
  // ...existing code...
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-250px')};
  // ...existing code...
`;

export default StyledComponent;