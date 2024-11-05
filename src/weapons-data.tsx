export const WEAPONS = [
  {
    name: "Paper",
    primaryColour: "indigo-500",
    icon: "assets/images/icon-paper.svg",
    beats: "Rock",
  },
  {
    name: "Scissors",
    primaryColour: "amber-500",
    icon: "assets/images/icon-scissors.svg",
    beats: "Paper",
  },
  {
    name: "Rock",
    primaryColour: "rose-600",
    icon: "assets/images/icon-rock.svg",
    beats: "Scissors",
  },
] as const;

export type Weapon = (typeof WEAPONS)[number];
export type WeaponNames = (typeof WEAPONS)[number]["name"];
