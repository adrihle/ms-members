import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    h3 {
      font-size: ${({ theme }) => theme.fontSize.TITLE };
      font-weight: 800;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.MOBILE }){
    justify-content: space-between;
  }
`;