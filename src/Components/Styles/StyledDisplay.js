import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 19px 0;
  padding: 19px;
  border: 4px solid #333;
  min-height: 28px;
  width: 100%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.76rem;

  @media (max-width: 768px) {
    margin: 0 0 9.5px 0;
    padding: 9.5px;
    font-size: 0.57rem;
    min-height: 24px;
  }

  @media (max-width: 480px) {
    margin: 0 0 7.6px 0;
    padding: 7.6px;
    font-size: 0.475rem;
    min-height: 19px;
  }
`;
