import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 30px;
  div {
    margin-top: 30px;
  }
`;

export const HeaderWrapper = styled.div<{ isModal?: boolean }>`
  display: ${({ isModal }) => isModal ? 'grid' : 'flex' };
  grid-template-columns: ${({ isModal }) => isModal ? `repeat(2, 1fr)` : 'unset' };
  justify-content: space-between;
  align-items: ${({ isModal }) => isModal ? `center` : 'unset' };
  padding: 0 10px;
`;