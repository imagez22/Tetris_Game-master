import styled from "styled-components";
// BG Image
import bgImage from "../../img/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 38px;
  margin: 0 auto;
  max-width: 900px;

  @media (max-width: 768px) {
    padding: 19px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 480px) {
    padding: 9.5px;
  }

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;

    @media (max-width: 768px) {
      max-width: none;
      padding: 20px 0 0 0;
      text-align: center;
    }
  }
`;



