"use client";

import React, { FC, useState } from "react";
import CustomDialog, { CustomDialogProps } from "./CustomDialog";
import { Tab } from "@headlessui/react";
import CloseIcon from "../icons/CloseIcon";
import styles from "./dialog.module.scss";
import useAxiosAuth from "@/utils/hooks/useAxiosAuth";
import { useToken } from "@/context/TokenContext";
import { createNewSolution } from "@/utils/axios/integrations";
import { useParams } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import { CustomListbox, ListboxElementType } from "../listbox/CustomListbox";

const langs: ListboxElementType[] = [{ name: "java" }];

const NewSolutionDialog: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
}: CustomDialogProps) => {
  const params = useParams();
  const { accessToken, setAccessToken } = useToken();
  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });

  const [selectedLang, setSelectedLang] = useState(langs[0]);
  const [sourceCode, setSourceCode] = useState("");

  const apply = async () => {
    createNewSolution(axiosAuth, {
      problemId: params.problemId as unknown as number,
      sourceCode: sourceCode,
      programmingLanguage: selectedLang.name.toUpperCase(),
    }).then(() => close());
  };

  const close = () => {
    setSourceCode("");
    closeModal();
  };

  return (
    <CustomDialog isOpen={isOpen} closeModal={close} className="max-w-[150vh]">
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            Submit your solution to check for plagiarism
          </div>
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
            Сhoose a programming language, add your solution and submit it for
            plagiarism verification
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
                    Solution
                  </div>
                  <div
                    className={selected ? styles.tab_title_bottom_selected : ""}
                  />
                </>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={styles.tab_panels}>
            <Tab.Panel>
              <div className="flex flex-col gap-3">
                <div>
                  <div className={styles.input_title_required}>Lang</div>
                  <CustomListbox
                    list={langs}
                    selected={selectedLang}
                    setSelected={setSelectedLang}
                  />
                </div>
                <div>
                  <div className={styles.input_title_required}>Source code</div>
                  <Editor
                    height="350px"
                    language={selectedLang.name}
                    theme="vs-dark"
                    value={sourceCode}
                    onChange={(it) => setSourceCode(it as string)}
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

export default NewSolutionDialog;
