import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

type Choice = "rock" | "paper" | "scissors" | undefined;
type GameStage =
  | "waitingForUser"
  | "houseIsChoosing"
  | "waitingForResult"
  | "showResult";
type Result = "win" | "lose" | "draw" | undefined;

function Choices({ onUserPick }: { onUserPick: (userPick: Choice) => void }) {
  return (
    <>
      <button onClick={() => onUserPick("rock")}>Rock</button>
      <button onClick={() => onUserPick("paper")}>Paper</button>
      <button onClick={() => onUserPick("scissors")}>Scissors</button>
    </>
  );
}

function Game({
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

function Scoreboard({ score }: { score: number }) {
  return (
    <header>
      <h1>Rock Paper Scissors</h1>
      <div>
        <div>Score</div>
        <div>{score}</div>
      </div>
    </header>
  );
}

function determineResult(userPick: Choice, housePick: Choice): Result {
  console.log({ userPick, housePick });

  if (!userPick || !housePick) return;
  if (userPick === housePick) return "draw";
  if (userPick === "paper" && housePick === "rock") return "win";
  if (userPick === "rock" && housePick === "scissors") return "win";
  if (userPick === "scissors" && housePick === "paper") return "win";
  return "lose";
}

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
      const options: Choice[] = ["rock", "paper", "scissors"];
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
    <div className="p-2">
      <Scoreboard score={score} />
      <main>
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
      </main>
    </div>
  );
}
