"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { FC } from "react";
import styles from "./problems.module.scss";
import Problems from "@/components/problems/Problems";

const ContestDetails: FC<{ params: { contestId: string } }> = ({ params }) => {
  return (
    <div className={styles.root}>
      <div className="w-full flex flex-col gap-5">
        <h1 className={styles.title}>Problems</h1>
        <div className="flex justify-between flex-wrap">
          <div className="flex gap-4 ml-auto">
            <div className="flex bg-ds-gray-100 rounded-md">
              <SearchIcon className="flex rounded px-2 py-1 text-ds-gray-700" />
              <input type="search" placeholder="Search problem..." />
            </div>
            <div className={styles.add_btn}>Add One</div>
          </div>
        </div>
        <Problems />
      </div>
    </div>
  );
};

export default ContestDetails;
function useState<T>(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
