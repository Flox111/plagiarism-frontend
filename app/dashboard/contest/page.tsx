"use client";

import styles from "./contest.module.scss";
import { SearchIcon } from "@/components/icons/SearchIcon";
import NewContestDialog from "@/components/dialog/NewContestDialog";
import { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useToken } from "@/context/TokenContext";
import ContestList, { ContestType } from "@/components/contestList/ContestList";

export interface ContestProps {
  title: string;
}

const contestsFetch = async (
  axiosAuth: AxiosInstance
): Promise<ContestType[]> => {
  let contests: ContestType[] = [];
  try {
    const body = {
      pageNumber: 0,
      pageSize: 50,
    };
    const { data } = await axiosAuth.post("/contest/findAll", body);
    contests = data.contests;
  } catch (e) {}
  return contests;
};

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
      <div className="w-full flex flex-col gap-5">
        <h1 className={styles.title}>Contests</h1>
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
    </div>
  );
}
