import { FC } from "react";
import styles from "./contests.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { ContestType } from "@/utils/axios/integrations";
import { ContestTypeComponent } from "../contestType/ContestTypeComponent";

const ContestList: FC<{ contests: ContestType[] }> = ({ contests }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={styles.parent}>
      <div className={styles.table}>
        <div className={styles.table_header}>
          <div className="w-20 px-2">Type</div>
          <div className="flex-1">Title</div>
        </div>
        {contests.map((contest) => {
          return (
            <div key={contest.id} className={styles.table_row}>
              <div className="w-20 flex justify-center items-center">
                <ContestTypeComponent contestType={contest.contestType} />
              </div>
              <div
                className="flex-1 text-ds-gray-1000"
                onClick={() => router.push(`${path}/${contest.id}`)}
              >
                {contest.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContestList;
