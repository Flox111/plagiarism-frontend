import { FC } from "react";

const ContestDetails: FC<{
  params: { contestId: string; problemId: string };
}> = ({ params }) => {
  return (
    <div>
      <h1>{params.contestId}</h1>
      <h1>{params.problemId}</h1>
    </div>
  );
};

export default ContestDetails;
