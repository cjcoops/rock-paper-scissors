import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import Weapon from "../components/Weapon";
import { WeaponNames, weapons } from "../weapons";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type Choice = WeaponNames | undefined;
type GameStage =
  | "waitingForUser"
  | "houseIsChoosing"
  | "waitingForResult"
  | "showResult";
type Result = "win" | "lose" | "draw" | undefined;

function Choices({ onUserPick }: { onUserPick: (userPick: Choice) => void }) {
  return weapons.map((weapon) => (
    <button onClick={() => onUserPick(weapon.name)} key={weapon.name}>
      <Weapon weapon={weapon} />
    </button>
  ));
}

function Results({
  userPick,
  housePick,
  result,
  resetGame,
}: {
  userPick: Choice;
  housePick: Choice;
  result: Result;
  resetGame: () => void;
}) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <div>You picked</div>
        <div>{userPick}</div>
      </div>
      <div>
        <div>The house picked</div>
        <div>{housePick}</div>
      </div>
      {result && (
        <div>
          <div>You {result}</div>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

function determineResult(userPick: Choice, housePick: Choice): Result {
  if (!userPick || !housePick) return;
  if (userPick === housePick) return "draw";
  if (userPick === "Paper" && housePick === "Rock") return "win";
  if (userPick === "Rock" && housePick === "Scissors") return "win";
  if (userPick === "Scissors" && housePick === "Paper") return "win";
  return "lose";
}

// Do we need game stage?
function HomeComponent() {
  const [score, setScore] = useState(0);
  const [userPick, setUserPick] = useState<Choice>();
  const [housePick, setHousePick] = useState<Choice>();
  const [gameStage, setGameStage] = useState<GameStage>("waitingForUser");
  const [result, setResult] = useState<Result>();

  const handleUserPick = (userPick: Choice) => {
    setUserPick(userPick);
    setGameStage("houseIsChoosing");

    setTimeout(() => {
      const options: Choice[] = weapons.map((w) => w.name);
      const randomIndex = Math.floor(Math.random() * options.length);
      const housePick = options[randomIndex];
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
    <div className="flex min-h-screen flex-col justify-center">
      <Scoreboard score={score} />
      <main>
        {gameStage === "waitingForUser" ? (
          <Choices onUserPick={handleUserPick} />
        ) : (
          <Results
            userPick={userPick}
            housePick={housePick}
            result={result}
            resetGame={resetGame}
          />
        )}
      </main>
    </div>
  );
}
