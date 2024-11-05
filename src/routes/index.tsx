import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import Scoreboard from "../components/Scoreboard";
import { Result, Weapon, WEAPONS } from "../weapons-data";
import Choices from "../components/Choices";
import Game from "../components/Game";
import { useScore } from "../useScore";
import RulesDialog from "../components/RulesDialog";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const DELAY_MS = 1000;

function determineResult(
  userPick: Weapon,
  housePick: Weapon,
): Result | undefined {
  if (!userPick || !housePick) return;
  if (userPick.beats === housePick.name) return "win";
  if (housePick.beats === userPick.name) return "lose";
  return "draw";
}

function HomeComponent() {
  const { score, updateScore } = useScore();
  const [userPick, setUserPick] = useState<Weapon | undefined>();
  const [housePick, setHousePick] = useState<Weapon | undefined>();
  const [result, setResult] = useState<Result>();

  const handleUserPick = (userPick: Weapon) => {
    setUserPick(userPick);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * WEAPONS.length);
      const housePick = WEAPONS[randomIndex];
      setHousePick(housePick);

      setTimeout(() => {
        const result = determineResult(userPick, housePick);
        if (!result) return;
        setResult(result);
        updateScore(result);
      }, DELAY_MS);
    }, DELAY_MS);
  };

  const resetGame = () => {
    setHousePick(undefined);
    setUserPick(undefined);
    setResult(undefined);
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center gap-24">
      <Scoreboard score={score} />
      {!userPick ? (
        <Choices onUserPick={handleUserPick} />
      ) : (
        <Game
          userPick={userPick}
          housePick={housePick}
          result={result}
          resetGame={resetGame}
        />
      )}
      <RulesDialog />
    </div>
  );
}
