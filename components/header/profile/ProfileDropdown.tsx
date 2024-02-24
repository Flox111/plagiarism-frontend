"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, SVGProps, JSX } from "react";
import Image from "next/image";
import { axiosAuth } from "@/utils/axios/axios";

export default function ProfileDropdown() {
  const handleLogout = async () => {
    try {
      await axiosAuth("/auth/logout", {
        method: "post",
        withCredentials: true,
      });
      window.location.reload();
    } catch (error: any) {}
  };

  return (
    <div className="justify-end">
      <Menu as="div" className="relative h-[24px] p-0 m-0">
        <Menu.Button className="pb-2">
          <Image
            src="/default_avatar.jpg"
            alt="default_avatar"
            width={24}
            height={24}
            className="rounded-full"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-72 px-2 pb-2 rounded-xl bg-dark-gray-30 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="mx-2 my-4 flex gap-3">
              <Image
                src="/default_avatar.jpg"
                alt="default_avatar"
                width={56}
                height={56}
                className="rounded-full"
              />
              <div className="text-dark-gray-100 font-semibold text-[20px]">
                floxandsunny
              </div>
            </div>

            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-dark-gray-45" : ""
                    } flex w-full items-center rounded-md px-2 py-2 text-sm text-dark-gray-70`}
                  >
                    <Image
                      src="/sign_out.svg"
                      alt="sign_out"
                      width={24}
                      height={24}
                      className="rounded-ful mr-2"
                      color="#acacac"
                    />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
