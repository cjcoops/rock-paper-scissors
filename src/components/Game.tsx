import { Weapon } from "../weapons-data";
import ResultComponent from "./Result";
import WeaponContainer from "./WeaponContainer";
import WeaponComponent from "./Weapon";
type Result = "win" | "lose" | "draw" | undefined;

function Game({
  userPick,
  housePick,
  result,
  resetGame,
}: {
  userPick: Weapon | undefined;
  housePick: Weapon | undefined;
  result: Result;
  resetGame: () => void;
}) {
  return (
    <div className="mx-auto grid w-full max-w-3xl auto-cols-auto grid-flow-col gap-6">
      <WeaponContainer text="You Picked">
        <WeaponComponent weapon={userPick} />
      </WeaponContainer>

      {result && <ResultComponent result={result} resetGame={resetGame} />}

      <WeaponContainer text="The House picked">
        <WeaponComponent weapon={housePick} />
      </WeaponContainer>
    </div>
  );
}

export default Game;
