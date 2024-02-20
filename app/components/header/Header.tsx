import { FC } from "react";
import styles from "./header.module.scss"
import ProfileDropdown from "./profile/ProfileDropdown";

export const Header: FC = () => {
  return (
    <header className={styles.parent}>
      <div className={styles.content_wrapper}>
        <div>ljnkmhbkhjblll</div>
        <ProfileDropdown />
      </div>
    </header>
  );
};
