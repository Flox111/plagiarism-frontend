import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import styles from "./dialog.module.scss"

export interface CustomDialogProps {
  isOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  className?: string;
}

const CustomDialog: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
  children,
  className
}) => {
  return (
    <div >
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="easy-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-ds-background-200/[0.8]"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="easy-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={styles.dialog_panel + " " + className}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CustomDialog;
