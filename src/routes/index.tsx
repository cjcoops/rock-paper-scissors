import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { Weapon, WEAPONS } from "../weapons-data";
import Choices from "../components/Choices";
import Result from "../components/Result";
import Game from "../components/Game";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const DELAY_MS = 1000;

type Result = "win" | "lose" | "draw" | undefined;

function determineResult(userPick: Weapon, housePick: Weapon): Result {
  if (!userPick || !housePick) return;
  if (userPick.beats === housePick.name) return "win";
  if (housePick.beats === userPick.name) return "lose";
  return "draw";
}

function HomeComponent() {
  const [score, setScore] = useState(0);
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
        setResult(result);
        setScore((prevScore: number) => {
          if (result === "win") {
            return prevScore + 1;
          } else if (result === "lose") {
            return prevScore - 1;
          } else {
            return prevScore;
          }
        });
      }, DELAY_MS);
    }, DELAY_MS);
  };

  const resetGame = () => {
    setHousePick(undefined);
    setUserPick(undefined);
    setResult(undefined);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center gap-24">
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
    </div>
  );
}
