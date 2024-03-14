import { AxiosInstance } from "axios";

export type ContestDetailType = {
  contest: ContestType;
  problems: ProblemType[];
};

export type ContestType = {
  id: number;
  title: string;
  description: string;
  createdDate: string;
};

export type ProblemType = {
  id: number;
  title: string;
  description: string;
  createdDate: string;
};

export const contestsFetch = async (
  axiosAuth: AxiosInstance
): Promise<ContestType[]> => {
  let contests: ContestType[] = [];
  const body = {
    pageNumber: 0,
    pageSize: 50,
  };
  const { data } = await axiosAuth.post("/contest/findAll", body);
  contests = data.contests;
  return contests;
};

export const contestDetailFetch = async (
  axiosAuth: AxiosInstance,
  contestId: string
): Promise<ContestDetailType | null> => {
  let contestDetail: ContestDetailType | null = null;
  const body = {
    contestId: contestId,
  };
  const { data } = await axiosAuth.post("/contest/detail", body);
  contestDetail = data;
  return contestDetail;
};

export type ContestRequestType = {
  title: string;
  description: string;
};

export const createNewContest = async (
  axiosAuth: AxiosInstance,
  contest: ContestRequestType
) => {
  await axiosAuth.post("/contest/add", contest);
};

export type ProblemRequestType = {
  contestId: number;
  title: string;
  description: string;
};

export const createNewProblem = async (
  axiosAuth: AxiosInstance,
  problem: ProblemRequestType
) => {
  await axiosAuth.post("/problem/add", problem);
};
