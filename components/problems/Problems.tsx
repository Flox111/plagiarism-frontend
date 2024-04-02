import { FC } from "react";
import styles from "./problems.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { ProblemType } from "@/utils/axios/integrations";

const Problems: FC<{ problems: ProblemType[] }> = ({ problems }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={styles.parent}>
      <div className={styles.table}>
        <div className={styles.table_header}>
          <div className="flex-1">Problem list</div>
        </div>
        {problems.map((problem, index) => {
          return (
            <div key={index} className={styles.table_row}>
              <div
                className="flex-1 text-ds-gray-1000"
                onClick={() => router.push(`${path}/problems/${problem.id}`)}
              >
                {problem.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Problems;
