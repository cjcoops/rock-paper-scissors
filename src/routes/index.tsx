import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Scoreboard from "../components/Scoreboard";
import { Weapon, weapons } from "../weapons";
import Choices from "../components/Choices";
import Result from "../components/Result";
import Game from "../components/Game";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type GameStage =
  | "waitingForUser"
  | "houseIsChoosing"
  | "waitingForResult"
  | "showResult";
type Result = "win" | "lose" | "draw" | undefined;

function determineResult(userPick: Weapon, housePick: Weapon): Result {
  if (!userPick || !housePick) return;
  if (userPick.name === housePick.name) return "draw";
  if (userPick.name === "Paper" && housePick.name === "Rock") return "win";
  if (userPick.name === "Rock" && housePick.name === "Scissors") return "win";
  if (userPick.name === "Scissors" && housePick.name === "Paper") return "win";
  return "lose";
}

// Do we need game stage?
function HomeComponent() {
  const [score, setScore] = useState(0);
  const [userPick, setUserPick] = useState<Weapon | undefined>();
  const [housePick, setHousePick] = useState<Weapon | undefined>();
  const [gameStage, setGameStage] = useState<GameStage>("waitingForUser");
  const [result, setResult] = useState<Result>();

  const handleUserPick = (userPick: Weapon) => {
    setUserPick(userPick);
    setGameStage("houseIsChoosing");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * weapons.length);
      const housePick = weapons[randomIndex];
      setHousePick(housePick);
      setGameStage("waitingForResult");

      setTimeout(() => {
        const result = determineResult(userPick, housePick);
        setResult(result);
        setGameStage("showResult");
        setScore((prevScore: number) => {
          if (result === "win") {
            return prevScore + 1;
          } else if (result === "lose") {
            return prevScore - 1;
          } else {
            return prevScore;
          }
        });
      }, 1000);
    }, 1000);
  };

  const resetGame = () => {
    setGameStage("waitingForUser");
    setHousePick(undefined);
    setUserPick(undefined);
    setResult(undefined);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center gap-24">
      <Scoreboard score={score} />
      {gameStage === "waitingForUser" ? (
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
