import React from "react";
import styled from "styled-components";

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ControlButton = styled.button`
  margin: 0 10px;
  padding: 15px 20px;
  font-size: 1.2rem;
  border-radius: 10px;
  border: none;
  background: #333;
  color: white;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  cursor: pointer;
  &:active {
    background: #555;
  }
`;

const TouchControls = ({ onLeft, onRight, onRotate, onDown }) => (
  <ControlsWrapper>
    <Row>
      <ControlButton onClick={onRotate}>⟳</ControlButton>
    </Row>
    <Row>
      <ControlButton onClick={onLeft}>←</ControlButton>
      <ControlButton onClick={onDown}>↓</ControlButton>
      <ControlButton onClick={onRight}>→</ControlButton>
    </Row>
  </ControlsWrapper>
);

export default TouchControls;