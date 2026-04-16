import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 4px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;

  @media (max-width: 768px) {
    max-width: 57vw;
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(57vw / ${(props) => props.width})
    );
  }

  @media (max-width: 480px) {
    max-width: 66.5vw;
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(66.5vw / ${(props) => props.width})
    );
  }
`;
