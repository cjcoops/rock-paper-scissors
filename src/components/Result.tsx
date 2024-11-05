import { FC } from "react";

const Result: FC<{ result: string; resetGame: () => void }> = ({
  result,
  resetGame,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="mt-20 text-4xl font-bold uppercase">You {result}</div>
      <button
        className="mt-4 w-full rounded-md bg-white py-2 text-sm uppercase text-slate-800 hover:text-rose-600"
        onClick={resetGame}
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;
