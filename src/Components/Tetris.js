import React, { useState, useRef, useEffect } from "react";

import { createStage, checkCollision } from "../gameHelper";
import { StyledTetrisWrapper, StyledTetris } from "./Styles/StyledTertis";

// Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 9.5px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 7.6px;
  }
`;


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // Touch handling state
  const touchStartRef = useRef(null);
  const touchStartTimeRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const [isRapidDropping, setIsRapidDropping] = useState(false);

  // Cleanup long press timer on unmount or game over
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
      setIsRapidDropping(false);
    };
  }, []);

  // Stop rapid dropping when game ends
  useEffect(() => {
    if (gameOver) {
      setIsRapidDropping(false);
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }
  }, [gameOver]);

 

  // Stop game logic
  const handleStopGame = () => {
    setGameOver(true);
      setDropTime(null);

    // ...any additional cleanup logic...
  };


  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log("re-render");


  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  // This one starts the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  // Rapid dropping for long press
  useInterval(() => {
    if (isRapidDropping && !gameOver) {
      dropPlayer();
    }
  }, isRapidDropping ? 50 : null); // Drop every 50ms during rapid drop

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 32) {
        // Space for hard drop
        dropPlayer();
      }
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (gameOver) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchStartTimeRef.current = Date.now();

    // Set long press timer for rapid dropping
    longPressTimerRef.current = setTimeout(() => {
      setIsRapidDropping(true);
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = (e) => {
    if (gameOver || !touchStartRef.current) return;

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    // Stop rapid dropping
    setIsRapidDropping(false);

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartTimeRef.current;

    const minSwipeDistance = 50;
    const maxTapTime = 200;

    // Check for tap (rotate) - only if not a long press
    if (deltaTime < maxTapTime && Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) {
      playerRotate(stage, 1);
      return;
    }

    // Check for swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          movePlayer(1); // Swipe right
        } else {
          movePlayer(-1); // Swipe left
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          dropPlayer(); // Swipe down
        }
      }
    }

    touchStartRef.current = null;
    touchStartTimeRef.current = null;
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <ButtonContainer>
            <StartButton callback={startGame} />
            <StopButton onStop={handleStopGame} />
          </ButtonContainer>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
