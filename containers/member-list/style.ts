import styled from "styled-components";

export const CardWrapper = styled.section<{ grid: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.grid}, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  justify-items: center;
  max-width: 1300px;
  width: 100%;
  margin-top: 30px;
`;

export const Wrapper = styled.section<{ isLoading?: boolean }>`
  display: flex;
  justify-content: center;
  padding-top: ${({ isLoading }) => isLoading ? '150px' : '0'};
  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.colors.PRIMARY};
  }
`;