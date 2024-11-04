import { FC, ReactNode } from "react";

const WeaponContainer: FC<{ children: ReactNode; text: string }> = ({
  children,
  text,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg uppercase">{text}</div>
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default WeaponContainer;
