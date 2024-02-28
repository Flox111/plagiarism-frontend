"use client";

import { Contests } from "@/components/contests/Contests";

export interface ContestProps {
  title: string;
}

const contest: ContestProps[] = [
  { title: "Weekly Contest 1" },
  { title: "Weekly Contest 2" },
  { title: "Weekly Contest 3" },
  { title: "Weekly Contest 4" },
  { title: "Weekly Contest 5" },
  { title: "Weekly Contest 7" },
  { title: "Weekly Contest 8" },
  { title: "Weekly Contest 9" },
  { title: "Weekly Contest 10" },
  { title: "Weekly Contest 11" },
];

export default function Contest() {
  return (
    <div className="flex flex-col justify-center items-center mx-[20%] my-5">
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between flex-wrap">
          <div className="text-white text-lg font-semibold">Contests</div>
          <div className="flex gap-4 ">
            <div className="flex bg-main-2 rounded-md">
              <span
                className="flex rounded px-3 py-1 text-neutral-700"
                id="basic-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                className="bg-main-2 rounded-r-md outline-none text-[14px] text-main-5/[0.75] placeholder:text-white/[0.1]"
                type="search"
                placeholder="Search"
              />
            </div>
            <div className="flex gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full shadow-md from-main-6 to-main-4 bg-gradient-to-b">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <g
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    data-name="add"
                  >
                    <path d="M12 19V5M5 12h14" />
                  </g>
                </svg>
              </span>
              <div className="self-center text-main-4 text-[14px]">Add one</div>
            </div>
          </div>
        </div>
        <Contests />
        {/* {contest.map((contest, index) => {
          return (
            <div
              key={index}
              className="bg-main-2 h-20 w-full flex rounded-r-xl rounded-l-md"
            >
              <div className="bg-main-3 w-2 rounded-l-md"></div>
              <div className="flex flex-col ms-3 mt-1">
                <div className="text-main-3 text-[9px] font-bold">CUSTOM</div>
                <div className="text-white">{contest.title}</div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
