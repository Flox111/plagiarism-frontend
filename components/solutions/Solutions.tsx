import { SolutionType } from "@/utils/axios/integrations";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import styles from "./solutions.module.scss";

const Solutions: FC<{ solutions: SolutionType[] }> = ({ solutions }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={styles.parent}>
      <div className={styles.table}>
        <table className="text-left border-separate border-spacing-y-5">
          <thead>
            <tr>
              <th className="border-b-2 border-ds-gray-100 pb-4">№</th>
              <th className="border-b-2 border-ds-gray-100 pb-4">When</th>
              <th className="border-b-2 border-ds-gray-100 pb-4">Who</th>
              <th className="border-b-2 border-ds-gray-100 pb-4">Lang</th>
              <th className="border-b-2 border-ds-gray-100 pb-4">Status</th>
              <th className="border-b-2 border-ds-gray-100 pb-4">Plagiarism</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution) => {
              return (
                <tr key={solution.id} onClick={() => router.push(`${path}/solution/${solution.id}`)}>
                  <td className="text-ds-gray-1000">{solution.id}</td>
                  <td className="text-ds-gray-1000">{solution.createdDate}</td>
                  <td className="text-ds-gray-1000">{solution.author}</td>
                  <td className="text-ds-gray-1000">
                    {solution.programmingLanguage}
                  </td>
                  <td className="text-ds-gray-1000">
                    {solution.plagiarismStatus?.replaceAll("_", " ")}
                  </td>
                  <td className="text-ds-gray-1000">
                    {solution.maxPlagiarism || "undefined"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Solutions;
