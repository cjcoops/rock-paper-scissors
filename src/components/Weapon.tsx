import { FC } from "react";
import { Weapon as WeaponType } from "../weapons-data";

const Weapon: FC<{ weapon?: WeaponType }> = ({ weapon }) => {
  if (!weapon) {
    return (
      <div className={`h-48 w-48 rounded-full p-5`}>
        <div className="flex h-full items-center justify-center rounded rounded-full bg-slate-800"></div>
      </div>
    );
  }
  return (
    <div className={`h-48 w-48 rounded-full bg-${weapon.primaryColour} p-5`}>
      <div className="flex h-full items-center justify-center rounded rounded-full bg-white">
        <img className="h-1/2 w-1/2" src={weapon.icon} />
      </div>
    </div>
  );
};

export default Weapon;
