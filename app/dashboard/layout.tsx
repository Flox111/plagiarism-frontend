"use client";

import { AxiosError, AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAxiosAuth from "../utils/hooks/useAxiosAuth";
import { Loading } from "../components/loading/Loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UserResponse {
  data: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const axiosAuth = useAxiosAuth();
  const [isVerify, setVerify] = useState<boolean>(false);

  useEffect(() => {
    checkVerify(axiosAuth).then((success: boolean) => {
      if (!success) {
        router.push("/");
      }
      setVerify(success);
    });
  }, []);

  return <main>{!isVerify ? <Loading /> : <div>{children}</div>}</main>;
}

const checkVerify = async (axiosAuth: AxiosInstance): Promise<boolean> => {
  let success: boolean = false;
  try {
    const { data } = await axiosAuth.post("/auth/verify");
    success = data.success;
  } catch (e) {}
  return success;
};
