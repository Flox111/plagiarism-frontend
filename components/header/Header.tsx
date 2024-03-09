"use client";

import { FC } from "react";
import styles from "./header.module.scss";
import ProfileDropdown from "./profile/ProfileDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";

const root = "/dashboard";
const tabs = new Map<string, string>([
  ["Contest", "/contest"],
  ["About", "/about"],
]);

export const Header: FC = () => {
  const currentPathname = usePathname();
  const isSubPath = (path: string) => currentPathname.startsWith(path);
  return (
    <header className={styles.parent}>
      <div className={styles.content_wrapper}>
        <div className="flex gap-8">
          {Array.from(tabs.entries()).map(([tab, path]) => {
            return (
              <Link
                key={tab}
                href={root + path}
                className="text-[14px] text-ds-gray-600 leading-[23.1px]"
              >
                <div
                  className={isSubPath(root + path) ? "text-ds-blue-700" : "hover:text-ds-gray-900"}
                >
                  {tab}
                </div>
              </Link>
            );
          })}
        </div>
        <ProfileDropdown />
      </div>
    </header>
  );
};
