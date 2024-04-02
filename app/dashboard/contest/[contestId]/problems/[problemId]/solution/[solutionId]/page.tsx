"use client";

import { notFound, useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useToken } from "@/context/TokenContext";
import {
  PlagiarismResultType,
  SolutionType,
  solutionDetailFetch,
} from "@/utils/axios/integrations";
import { Loading } from "@/components/loading/Loading";
import { Tab } from "@headlessui/react";
import CustomSyntaxHighlighter from "@/components/syntaxHighlighter/CustomSyntaxHighlighter";

const SolutionDetail: FC = () => {
  const { accessToken, setAccessToken } = useToken();
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  const [solution, setSolution] = useState<SolutionType | null>(null);
  const [plagiarismResults, setPlagiarismResults] = useState<
    PlagiarismResultType[]
  >([]);

  const params = useParams();

  useEffect(() => {
    solutionDetailFetch(axiosAuth, params.solutionId as string)
      .then((it) => {
        setSolution(it?.solution || null);
        setPlagiarismResults(it?.plagiarismResults || []);
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true);
      });
  }, []);

  if (isNotFound) {
    notFound();
  }

  if (!solution) {
    return <Loading />;
  }

  return (
    <div className="mx-[17%] my-5">
      <div className="border-b-[1px] border-ds-gray-100 px-1">
        <div className="text-[30px] text-ds-gray-1000 font-semibold">
          Solution detail
        </div>
        <div className="mt-8 mb-14 flex flex-col gap-3">
          <p>Programming language: {solution.programmingLanguage}</p>
          <p>Plagiarism status: {solution.plagiarismStatus}</p>
          <p>Author: {solution.author}</p>
          <p>Created date: {solution.createdDate}</p>
          {plagiarismResults.map((result, index) => (
            <div key={index} className="inline-block">
              <p>
                {result.plagiarismType}: {result.plagiarism}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-10 w-full justify-center gap-3">
        <Tab.Group>
          <Tab.List className="flex justify-around p-1">
            {plagiarismResults.map((result, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  "w-full rounded-lg p-2.5 mx-2 text-sm font-medium leading-5 focus:outline-none " +
                  (selected
                    ? "bg-ds-gray-alpha-400 text-blue-700 shadow"
                    : "bg-ds-gray-alpha-100 hover:bg-white/[0.12] hover:text-white")
                }
              >
                {result.plagiarismType}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {plagiarismResults.map((result, index) => (
              <Tab.Panel key={index} className="flex justify-evenly">
                <div>
                  <div className="px-[10px]">This solution</div>
                  <div className="px-[10px]">
                    Created date: {solution.createdDate}
                  </div>
                  <CustomSyntaxHighlighter solution={solution} />
                </div>
                <div>
                  <div className="px-[10px]">Similar solution</div>
                  <div className="px-[10px]">
                    Created date: {result.similarSolution.createdDate}
                  </div>
                  <CustomSyntaxHighlighter solution={result.similarSolution} />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SolutionDetail;
