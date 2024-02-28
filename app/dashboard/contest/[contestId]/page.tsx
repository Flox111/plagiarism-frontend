import { FC } from "react";

const ContestDetails: FC<{ params: { contestId: string } }> = ({ params }) => {
  return <div>{params.contestId}</div>;
};

export default ContestDetails;
