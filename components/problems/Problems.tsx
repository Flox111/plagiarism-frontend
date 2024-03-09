import { FC, useState } from "react";
import styles from "./problems.module.scss";
import { usePathname, useRouter } from "next/navigation";

export interface ContestProps {
  id: number;
  title: string;
}

const generateProblems = () => {
  const contests: ContestProps[] = [];
  for (let i = 0; i < 10; i++) {
    contests.push({ id: i, title: `Weekly Contest ${i}` });
  }
  return contests;
};

const Problems: FC = () => {
  const router = useRouter();
  const path = usePathname();

  const [problems, setProblems] = useState<ContestProps[]>(generateProblems());

  return (
    <div className={styles.parent}>
      <div className={styles.table}>
        <div className={styles.table_header}>
          <div className="flex-1">Title</div>
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
