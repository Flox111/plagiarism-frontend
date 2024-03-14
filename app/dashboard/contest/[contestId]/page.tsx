"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { FC, useEffect, useState } from "react";
import styles from "./problems.module.scss";
import Problems from "@/components/problems/Problems";
import { useToken } from "@/context/TokenContext";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { Loading } from "@/components/loading/Loading";
import { notFound } from "next/navigation";
import {
  ContestDetailType,
  ProblemType,
  contestDetailFetch,
} from "@/utils/axios/integrations";
import TableOfContents from "@/components/tableOfContents/TableOfContents";
import NewProblemDialog from "@/components/dialog/NewProblemDialog";

const ContestDetail: FC<{ params: { contestId: string } }> = ({ params }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, setAccessToken } = useToken();
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  const [problems, setProblems] = useState<ProblemType[]>([]);
  const [contestDetail, setContestDetail] = useState<ContestDetailType | null>(
    null
  );

  useEffect(() => {
    contestDetailFetch(axiosAuth, params.contestId)
      .then((it) => {
        setContestDetail(it);
        setProblems(it?.problems || []);
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, [isOpen]);

  if (isNotFound) {
    notFound();
  }

  if (!contestDetail) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <NewProblemDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <div className="grid grid-cols-[4fr_1fr] gap-10 w-full">
        <div className="w-full flex flex-col gap-5">
          <div className="border-b-[1px] border-ds-gray-100">
            <div id="section-1" className={styles.title}>
              {contestDetail.contest.title}
            </div>
            <div className="mt-8 mb-14 flex flex-col gap-3">
              <p>Description: {contestDetail.contest.description}</p>
              <p>Created date: {contestDetail.contest.createdDate}</p>
            </div>
          </div>
          <div
            id="section-2"
            className="text-[24px] text-ds-gray-1000 font-semibold mt-5"
          >
            Problems
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex gap-4 ml-auto">
              <div className={styles.add_btn} onClick={() => setIsOpen(true)}>
                Add One
              </div>
            </div>
          </div>
          <Problems problems={problems} />
        </div>
        <TableOfContents
          sections={[
            { idLinkedElement: "section-1", title: "Contest detail" },
            { idLinkedElement: "section-2", title: "Problems" },
          ]}
        />
      </div>
    </div>
  );
};

export default ContestDetail;
