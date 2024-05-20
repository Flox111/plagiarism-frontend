import { AxiosInstance } from "axios";

export type ContestDetailType = {
  contest: ContestType;
  problems: ProblemType[];
};

export type ProblemDetailType = {
  problem: ProblemType;
  solutions: SolutionType[];
};

export type SolutionDetailType = {
  solution: SolutionType;
  plagiarismResults: PlagiarismResultType[];
};

export type ContestType = {
  id?: number;
  title: string;
  description: string;
  contestType: string;
  createdDate?: string;
};

export type ProblemType = {
  id?: number;
  title: string;
  description: string;
  createdDate?: string;
  contestId: number;
};

export type SolutionType = {
  id?: number;
  sourceCode: string;
  programmingLanguage: string;
  plagiarismStatus?: string;
  maxPlagiarism?: number;
  author?: string;
  createdDate?: string;
  problemId?: number;
};

export type PlagiarismResultType = {
  plagiarism: number;
  algorithmType: string;
  similarSolution: SolutionType;
};

export const contestsFetch = async (
  axiosAuth: AxiosInstance
): Promise<ContestType[]> => {
  let contests: ContestType[] = [];
  const params = {
    pageNumber: 0,
    pageSize: 50,
  };
  const { data } = await axiosAuth.get("/contest/findAll", { params: params });

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

export const problemDetailFetch = async (
  axiosAuth: AxiosInstance,
  problemId: string
): Promise<ProblemDetailType | null> => {
  let contestDetail: ProblemDetailType | null = null;
  const body = {
    problemId: problemId,
    pageNumber: 0,
    pageSize: 50,
  };
  const { data } = await axiosAuth.post("/problem/detail", body);
  contestDetail = data;
  return contestDetail;
};

export const solutionDetailFetch = async (
  axiosAuth: AxiosInstance,
  solutionId: string
): Promise<SolutionDetailType | null> => {
  let solutionDetail: SolutionDetailType | null = null;
  const body = {
    solutionId: solutionId,
  };
  const { data } = await axiosAuth.post("/solution/detail", body);
  solutionDetail = data;
  return solutionDetail;
};

export const createNewContest = async (
  axiosAuth: AxiosInstance,
  contest: ContestType
) => {
  await axiosAuth.post("/contest/add", contest);
};

export const createNewProblem = async (
  axiosAuth: AxiosInstance,
  problem: ProblemType
) => {
  await axiosAuth.post("/problem/add", problem);
};

export const createNewSolution = async (
  axiosAuth: AxiosInstance,
  solution: SolutionType
) => {
  await axiosAuth.post("/solution/add", solution);
};
