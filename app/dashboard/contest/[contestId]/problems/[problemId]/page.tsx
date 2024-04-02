"use client";

import { notFound, useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import styles from "./problemId.module.scss";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import TableOfContents from "@/components/tableOfContents/TableOfContents";
import { useToken } from "@/context/TokenContext";
import {
  ProblemDetailType,
  problemDetailFetch,
  SolutionType,
} from "@/utils/axios/integrations";
import { Loading } from "@/components/loading/Loading";
import Solutions from "@/components/solutions/Solutions";
import NewSolutionDialog from "@/components/dialog/NewSolutionDialog";

const ProblemDetail: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, setAccessToken } = useToken();
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  const [solutions, setSolutions] = useState<SolutionType[]>([]);
  const [problemDetail, setProblemDetail] = useState<ProblemDetailType | null>(
    null
  );

  const params = useParams();

  useEffect(() => {
    problemDetailFetch(axiosAuth, params.problemId as string)
      .then((it) => {
        setProblemDetail(it);
        setSolutions(it?.solutions || []);
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, [isOpen]);

  if (isNotFound) {
    notFound();
  }

  if (!problemDetail) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <NewSolutionDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <div className="grid grid-cols-[4fr_1fr] gap-10 w-full">
        <div className="w-full flex flex-col gap-5">
          <div className="border-b-[1px] border-ds-gray-100">
            <div id="section-1" className={styles.title}>
              {problemDetail.problem.title}
            </div>

            <div className="mt-8 mb-14 flex flex-col gap-3">
              <p>{problemDetail.problem.description}</p>
              <p>Created date: {problemDetail.problem.createdDate}</p>
            </div>
          </div>
          <div
            id="section-2"
            className="text-[24px] text-ds-gray-1000 font-semibold mt-5"
          >
            Solutions
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex gap-4 ml-auto">
              <div className={styles.add_btn} onClick={() => setIsOpen(true)}>
                Add One
              </div>
            </div>
          </div>
          <Solutions solutions={solutions} />
        </div>
        <TableOfContents
          sections={[
            { idLinkedElement: "section-1", title: "Problem detail" },
            { idLinkedElement: "section-2", title: "Solutions" },
          ]}
        />
      </div>
    </div>
  );
};

export default ProblemDetail;
