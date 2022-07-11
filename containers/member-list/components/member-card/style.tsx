import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 10px;
  padding: 20px;
  max-width: 300px;
    p {
      margin: 0;
    }
  width: 100%;
    border-color: ${({ theme }) => theme.colors.SHADOW};
    border: 1px solid ${({ theme }) => theme.colors.SHADOW};
    box-shadow: 5px 10px ${({ theme }) => theme.colors.SHADOW};
    border-radius: ${({ theme }) => theme.borderRadius.CARD};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

export const TagWrapper = styled.div`
  margin: 10px 0 0 15px;
`;