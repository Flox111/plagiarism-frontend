"use client";

import Contests from "@/components/contests/Contests";
import styles from "./contest.module.scss";
import { SearchIcon } from "@/components/icons/SearchIcon";
import NewContestDialog from "@/components/dialog/NewContestDialog";
import { useState } from "react";

export interface ContestProps {
  title: string;
}

export default function Contest() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Contests />
      </div>
    </div>
  );
}
