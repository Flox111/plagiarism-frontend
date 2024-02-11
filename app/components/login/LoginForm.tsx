"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useToken } from "../../context/TokenContext";
import useAxiosAuth from "../../utils/hooks/useAxiosAuth";

export const LoginForm = () => {
  const router = useRouter();
  const { setAccessToken } = useToken();
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email: formValues.email,
      password: formValues.password,
    };
    try {
      setLoading(true);
      // setFormValues({ email: "", password: "" });
      const data = await axios(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          method: "post",
          data: payload,
          withCredentials: true,
        }
      );
      console.log(data.data.accessToken);
      setAccessToken(data.data.accessToken);
      router.push("/dashboard");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  return (
    <div className="bg-dark-gray-5 p-4 rounded-3xl flex flex-col shadow-3xl">
      <h1 className="self-center font-bold text-[30px] mb-16">Log in</h1>
      <form onSubmit={handleSubmit} className="w-64">
        {error && (
          <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
        )}
        <div className="mb-6">
          <div className="px-1 mb-2 text-dark-gray-80 text-xs">Username</div>
          <div className="rounded-xl p-[1px] w-full bg-dark-gray-20 focus-within:bg-gradient-to-r focus-within:from-[#fb7185] focus-within:via-[#d946ef] focus-within:to-[#6366f1]">
            <input
              required
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your username"
              className="block outline-none w-full px-4 py-3 text-xs font-normal
              text-dark-gray-80 bg-dark-gray-15 bg-clip-padding 
                rounded-xl transition ease-in-out m-0 placeholder:text-dark-gray-50"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="px-1 mb-2 text-dark-gray-80 text-xs">Password</div>
          <div className="rounded-xl p-[1px] w-full bg-dark-gray-20 focus-within:bg-gradient-to-r focus-within:from-[#fb7185] focus-within:via-[#d946ef] focus-within:to-[#6366f1]">
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="block outline-none w-full px-4 py-3 text-xs font-normal
              text-dark-gray-80 bg-dark-gray-15 bg-clip-padding 
                rounded-xl transition ease-in-out m-0 placeholder:text-dark-gray-50"
            />
          </div>
        </div>
        <div className="rounded-xl p-[1px] mb-4 mt-10 from-[#fb7185] via-[#d946ef] to-[#6366f1] bg-gradient-to-r">
          <button
            type="submit"
            style={{ backgroundColor: `${loading ? "#ccc" : ""}` }}
            className="inline-block rounded-2xl px-7 py-3 text-xs bg-blue-600 text-white font-medium leading-snug shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            disabled={loading}
          >
            {loading ? "loading..." : "Log in"}
          </button>
        </div>
      </form>
      <div className="self-center text-[14px] mb-6 text-dark-gray-70 text-xs">
        Don’t have an account?{" "}
        <a href="/signup" className="font-bold text-dark-gray-100">
          Sign up
        </a>
      </div>
    </div>
  );
};
