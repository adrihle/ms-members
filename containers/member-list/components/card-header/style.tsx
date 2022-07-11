import styled from "styled-components";

export const HeaderWrapper = styled.div<{ isModal?: boolean }>`
  display: ${({ isModal }) => isModal ? 'grid' : 'flex' };
  grid-template-columns: ${({ isModal }) => isModal ? `repeat(2, 1fr)` : 'unset' };
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;