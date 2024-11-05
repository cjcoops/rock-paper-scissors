export const WEAPONS = [
  {
    name: "Paper",
    primaryColour: "indigo-500",
    icon: "/images/icon-paper.svg",
    beats: "Rock",
  },
  {
    name: "Scissors",
    primaryColour: "amber-500",
    icon: "/images/icon-scissors.svg",
    beats: "Paper",
  },
  {
    name: "Rock",
    primaryColour: "rose-600",
    icon: "/images/icon-rock.svg",
    beats: "Scissors",
  },
] as const;

export type Weapon = (typeof WEAPONS)[number];
export type WeaponNames = (typeof WEAPONS)[number]["name"];
export type Result = "win" | "lose" | "draw";
