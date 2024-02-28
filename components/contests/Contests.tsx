import { FC } from "react";
import styles from "./contests.module.scss";
import { useRouter } from "next/navigation";

export interface ContestProps {
  id: number;
  title: string;
}

const contest: ContestProps[] = [];

export const Contests: FC = () => {
  const router = useRouter()

  for (let i = 0; i < 100; i++) {
    contest.push({ id: i, title: `Weekly Contest ${i}` });
  }

  return (
    <div className={styles.parent}>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {contest.map((contest, index) => {
            return (
              <tr key={index} className="even:bg-main-2 rounded-lg">
                <td className="text-main-3 text-[9px] font-bold">CUSTOM</td>
                <td className="text-white" onClick={() => router.push(`/dashboard/contest/${contest.id}`)}>{contest.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
