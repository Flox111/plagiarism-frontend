import { FC } from "react";

export const ContestTypeComponent: FC<{
  contestType: string;
  className?: string;
}> = ({ contestType, className }) => {
  return (
    <div
      className={
        className +
        " text-ds-blue-700 bg-ds-blue-100 text-[9px] font-bold rounded-lg px-2 py-1 w-fit"
      }
    >
      {contestType}
    </div>
  );
};
