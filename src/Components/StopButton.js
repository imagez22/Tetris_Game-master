import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  padding: 19px;
  min-height: 28px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: #e74c3c;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #c0392b;
  }

  @media (max-width: 768px) {
    padding: 11.4px;
    font-size: 0.76rem;
    min-height: 24px;
  }

  @media (max-width: 480px) {
    padding: 9.5px;
    font-size: 0.665rem;
    min-height: 19px;
  }
`;

const StopButton = ({ onStop }) => (
  <StyledButton onClick={onStop}>
    Stop Game
  </StyledButton>
);

export default StopButton;