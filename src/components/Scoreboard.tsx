function Scoreboard({ score }: { score: number }) {
  return (
    <header className="mx-auto flex w-full max-w-xl justify-between rounded-lg border-2 border-slate-500 px-4 py-3 uppercase">
      <h1 className="text-3xl leading-6">
        <div>Rock</div>
        <div>Paper</div>
        <div>Scissors</div>
      </h1>

      <div className="flex flex-col items-center rounded-lg bg-white px-6 py-2">
        <div className="text-xs tracking-widest text-blue-800">Score</div>
        <div className="text-4xl font-bold text-slate-700">{score}</div>
      </div>
    </header>
  );
}

export default Scoreboard;
