"use client";

import { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAxiosAuth from "../../utils/hooks/useAxiosAuth";
import { Loading } from "../../components/loading/Loading";
import { Header } from "../../components/header/Header";
import { useToken } from "../../context/TokenContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { accessToken, setAccessToken } = useToken();

  const axiosAuth = useAxiosAuth({ accessToken, setAccessToken });
  const [isVerify, setVerify] = useState<boolean>(false);

  useEffect(() => {
    checkVerify(axiosAuth).then((success: boolean) => {
      if (!success) {
        router.push("/");
      }
      setVerify(success);
    });
  }, []);

  return (
    <main>
      {!isVerify ? (
        <Loading />
      ) : (
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex-grow mt-16">{children}</div>
          <footer className="shrink-0 h-[50px]">footer</footer>
        </div>
      )}
    </main>
  );
}

const checkVerify = async (axiosAuth: AxiosInstance): Promise<boolean> => {
  let success: boolean = false;
  try {
    const { data } = await axiosAuth.post("/auth/verify");
    success = data.success;
  } catch (e) {}
  return success;
};
