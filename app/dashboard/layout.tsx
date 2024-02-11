"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAxiosAuth from "../utils/hooks/useAxiosAuth";

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
  const [user, setUser] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosAuth.get("/api/v1/user");
        setUser(data);
      } catch (e) {
        const error = e as AxiosError;
        router.push("/");
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      {!user ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{user}</h1>
          {children}
        </div>
      )}
    </main>
  );
}
