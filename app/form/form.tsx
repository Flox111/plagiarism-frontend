"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useToken } from "../context/TokenContext";
import useAxiosAuth from "../hooks/useAxiosAuth";

export const LoginForm = () => {
  const router = useRouter();
  const {setAccessToken} = useToken()
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
      const data = await axios("http://localhost:8080/api/v1/auth/authenticate", {
        method: "post",
        data: payload,
        withCredentials: true
      })
      console.log(data.data.accessToken)
      setAccessToken(data.data.accessToken)
      router.push("/dashboard")
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await axiosAuth.post("http://localhost:8080/test/1", {})
      console.log(data.data)
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        {loading ? "loading..." : "Sign In"}
      </button>
      <button
        type="button"
        onClick={handleSubmit2}
        style={{ backgroundColor:  "#3446eb" }}
        className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        disabled={loading}
      >
        test
      </button>
    </form>
  );
};
