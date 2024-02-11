"use client";

import { useEffect } from "react";
import { axiosAuth } from "../axios/axios";
import { useToken } from "../../context/TokenContext";
import axios from "axios";

const useAxiosAuth = () => {
  const { accessToken, setAccessToken } = useToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        console.log("header " + accessToken);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status == 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const res = await axios(
            "http://localhost:8080/api/v1/auth/refreshToken",
            {
              method: "post",
              data: {},
              withCredentials: true,
            }
          );
          console.log("new access: " + res.data.accessToken);
          setAccessToken(res.data.accessToken);
          prevRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, setAccessToken]);

  return axiosAuth;
};

export default useAxiosAuth;
