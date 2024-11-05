import { useEffect, useState } from "react";
import { Result } from "./weapons-data";

export function useScore() {
  const initialScore = Number(localStorage.getItem("score")) ?? 0;

  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    localStorage.setItem("score", `${score}`);
  }, [score]);

  function updateScore(result: Result) {
    setScore((prevScore) => {
      if (result === "win") {
        return prevScore + 1;
      } else if (result === "lose") {
        return prevScore - 1;
      } else {
        return prevScore;
      }
    });
  }

  return { score, updateScore };
}
