"use client";

import styles from "./contest.module.scss";
import { SearchIcon } from "@/components/icons/SearchIcon";
import NewContestDialog from "@/components/dialog/NewContestDialog";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useToken } from "@/context/TokenContext";
import TableOfContents from "@/components/tableOfContents/TableOfContents";
import { ContestType, contestsFetch } from "@/utils/axios/integrations";
import ContestList from "@/components/contestList/ContestList";

export default function Contest() {
  const [isOpen, setIsOpen] = useState(false);
  const [contests, setContests] = useState<ContestType[]>([]);
  const { accessToken, setAccessToken } = useToken();
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  useEffect(() => {
    contestsFetch(axiosAuth).then((contests: ContestType[]) =>
      setContests(contests)
    );
  }, [isOpen]);

  return (
    <div className={styles.root}>
      <NewContestDialog isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <div className="grid grid-cols-[4fr_1fr] gap-10">
        <div className="w-full flex flex-col gap-5">
          <div className="border-b-[1px] border-ds-gray-100">
            <div id="section-1" className={styles.title}>
              Contests
            </div>
            <div className="mt-8 mb-14 flex flex-col gap-5">
              <p>
                The page contains a list of contests where you can search for
                plagiarism. Here you will find information about various events
                and will be able to quickly and conveniently check the works for
                plagiarism, as well as the opportunity to add your own
                competitions.
              </p>
              <p>
                The search allows you to filter competitions by parameters for
                effective search and analysis.
              </p>
            </div>
          </div>
          <div
            id="section-2"
            className="text-[24px] text-ds-gray-1000 font-semibold mt-5"
          >
            List of contests
          </div>
          <div className="flex justify-between flex-wrap">
            <div className="flex gap-4 ml-auto">
              <div className="flex bg-ds-gray-100 rounded-md">
                <SearchIcon className="flex rounded px-2 py-1 text-ds-gray-700" />
                <input type="search" placeholder="Search contest..." />
              </div>
              <div className={styles.add_btn} onClick={() => setIsOpen(true)}>
                Add One
              </div>
            </div>
          </div>
          <ContestList contests={contests} />
        </div>
        <TableOfContents
          sections={[
            { idLinkedElement: "section-1", title: "Info" },
            { idLinkedElement: "section-2", title: "List of contests" },
          ]}
        />
      </div>
    </div>
  );
}
