import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  box-sizing: border-box;
  margin: 20px auto;
  padding: 20px;
  min-height: 30px;
  width: 200px;
  border-radius: 20px;
  border: none;
  color: white;
  background: #e74c3c;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #c0392b;
  }
`;

const StopButton = ({ onStop }) => (
  <StyledButton onClick={onStop}>
    Stop Game
  </StyledButton>
);

export default StopButton;