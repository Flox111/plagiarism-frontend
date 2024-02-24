"use client";

import { FC } from "react";
import styles from "./header.module.scss";
import ProfileDropdown from "./profile/ProfileDropdown";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToken } from "@/context/TokenContext";

const root = "/dashboard";
const tabs = new Map<string, string>([
  ["Contest", "/contest"],
  ["Contest2", "/contest2"],
]);

export const Header: FC = () => {
  const currentPathname = usePathname();
  const token = useToken();

  console.log(token.accessToken);
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
                className="text-[16px] font-medium text-dark-gray-70"
              >
                <div
                  className={
                    isSubPath(root + path)
                      ? "text-dark-gray-100 font-semibold"
                      : ""
                  }
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