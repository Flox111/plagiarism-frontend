"use client"

import { useParams } from "next/navigation";
import { FC } from "react";

const ContestDetails: FC = () => {
  const params = useParams();

  return (
    <div>
      <h1>{params.contestId}</h1>
      <h1>{params.problemId}</h1>
    </div>
  );
};

export default ContestDetails;
