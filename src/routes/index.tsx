import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Scoreboard from "../components/Scoreboard";
import Weapon from "../components/Weapon";
import { WeaponNames, weapons } from "../weapons";
import clsx from "clsx";

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
  const weaponButtons = weapons.map((weapon, index) => {
    return (
      <button
        onClick={() => onUserPick(weapon.name)}
        key={weapon.name}
        className={clsx(
          "absolute",
          index === 0 && "left-0 top-0",
          index === 1 && "right-0 top-0",
          index === 2 && "bottom-0",
        )}
      >
        <Weapon weapon={weapon} />
      </button>
    );
  });

  return (
    <main className="relative mx-auto flex h-[400px] w-[450px] items-center justify-center">
      {weaponButtons}
    </main>
  );
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
    <div className="flex min-h-screen flex-col justify-center gap-24">
      <Scoreboard score={score} />
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
    </div>
  );
}
