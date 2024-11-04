export const weapons = [
  {
    name: "Paper",
    primaryColour: "indigo-500",
    icon: "images/icon-paper.svg",
  },
  {
    name: "Scissors",
    primaryColour: "amber-500",
    icon: "images/icon-scissors.svg",
  },
  {
    name: "Rock",
    primaryColour: "rose-600",
    icon: "images/icon-rock.svg",
  },
] as const;

export type Weapon = (typeof weapons)[number];
export type WeaponNames = (typeof weapons)[number]["name"];