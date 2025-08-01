import { useState, useEffect, useCallback } from "react";

// linePoints: points for clearing 1, 2, 3, or 4 lines at once (Tetris scoring)
const linePoints = [40, 100, 300, 1200];

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      // Calculate points based on how many lines were cleared at once
      const points = linePoints[rowsCleared - 1] || 0;
      setScore((prev) => prev + points * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared]);

  return [score, setScore, rows, setRows, level, setLevel];
};