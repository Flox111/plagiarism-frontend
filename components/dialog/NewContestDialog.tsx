"use client";

import React, { FC, createRef, useContext, useRef, useState } from "react";
import CustomDialog, { CustomDialogProps } from "./CustomDialog";
import { Tab } from "@headlessui/react";
import CloseIcon from "../icons/CloseIcon";
import styles from "./dialog.module.scss";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useToken } from "@/context/TokenContext";

const PauseDialog: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
}: CustomDialogProps) => {
  const { accessToken, setAccessToken } = useToken();
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const apply = async () => {
    try {
      const body = {
        title: title,
        description: description,
      };
      const { data } = await axiosAuth.post("/contest/add", body);
      close();
    } catch (e) {}
  };

  const close = () => {
    setTitle("");
    setDescription("");
    closeModal();
  };

  return (
    <CustomDialog isOpen={isOpen} closeModal={close}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.header_title}>Create a new contest</div>
          <button
            type="button"
            className={styles.header_close_button}
            onClick={close}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mx-[10px]">
          <div className="text-[11.5px] mb-2">
            Задайте время (мс), в течении которого запущенный сценарий остановит
            свое выполнение
          </div>
        </div>
        <Tab.Group>
          <Tab.List className={styles.tab_list}>
            <Tab>
              {({ selected }) => (
                <>
                  <div
                    className={
                      selected
                        ? styles.tab_title_selected
                        : styles.tab_title_unselected
                    }
                  >
                    Custom
                  </div>
                  <div
                    className={selected ? styles.tab_title_bottom_selected : ""}
                  />
                </>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <>
                  <div
                    className={
                      selected
                        ? styles.tab_title_selected
                        : styles.tab_title_unselected
                    }
                  >
                    Codeforces
                  </div>
                  <div
                    className={
                      selected
                        ? "border-b-2"
                        : "text-primary-400 hover:text-primary-100 border-primary-200"
                    }
                  />
                </>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={styles.tab_panels}>
            <Tab.Panel>
              <div className="flex flex-col gap-3">
                <div>
                  <div className={styles.input_title_required}>Title</div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <div className={styles.input_title_required}>Description</div>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className={styles.apply_button}>
        <button onClick={apply}>Create</button>
      </div>
    </CustomDialog>
  );
};

export default PauseDialog;
