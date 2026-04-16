import React from "react";
import styled from "styled-components";
const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 19px 0;
  padding: 19px;
  min-height: 28px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #333;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 0 0 9.5px 0;
    padding: 11.4px;
    font-size: 0.76rem;
    min-height: 24px;
  }

  @media (max-width: 480px) {
    margin: 0 0 7.6px 0;
    padding: 9.5px;
    font-size: 0.665rem;
    min-height: 19px;
  }
`;

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
