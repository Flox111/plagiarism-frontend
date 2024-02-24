"use client";

import { useEffect } from "react";
import { axiosAuth } from "../axios/axios";
import { TokenContextProps } from "../../context/TokenContext";
import axios from "axios";

const useAxiosAuth = ({ accessToken, setAccessToken }: TokenContextProps) => {
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && accessToken) {
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
            "http://localhost:8080/plagiarism/api/v1/auth/refreshToken",
            {
              method: "post",
              data: {},
              withCredentials: true,
            }
          );
          setAccessToken(res.data.accessToken);
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
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
