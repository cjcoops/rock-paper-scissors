import { FC } from "react";
import { Weapon, WEAPONS } from "../weapons-data";
import clsx from "clsx";
import WeaponComponent from "./Weapon";

const Choices: FC<{ onUserPick: (userPick: Weapon) => void }> = ({
  onUserPick,
}) => {
  const weaponButtons = WEAPONS.map((weapon, index) => {
    return (
      <button
        onClick={() => onUserPick(weapon)}
        key={weapon.name}
        className={clsx(
          "absolute",
          index === 0 && "left-0 top-0",
          index === 1 && "right-0 top-0",
          index === 2 && "bottom-0",
        )}
      >
        <WeaponComponent weapon={weapon} />
      </button>
    );
  });

  return (
    <main className="relative mx-auto flex h-[400px] w-[450px] items-center justify-center">
      {weaponButtons}
    </main>
  );
};

export default Choices;
