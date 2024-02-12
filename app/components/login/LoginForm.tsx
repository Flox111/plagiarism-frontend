"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useToken } from "../../context/TokenContext";
import useAxiosAuth from "../../utils/hooks/useAxiosAuth";
import styles from "./form.module.scss";

export const LoginForm = () => {
  const router = useRouter();
  const { setAccessToken } = useToken();
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formValues) {
    }

    const payload = {
      email: formValues.username,
      password: formValues.password,
    };
    try {
      setLoading(true);
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
      // setError(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.parent}>
      <h1 className={styles.form_title}>Log in</h1>
      <form onSubmit={handleSubmit} className="w-64">
        <div className="mb-6">
          <div className={styles.input_title}>Username</div>
          <div className={styles.input_wrapper}>
            <input
              required
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          {usernameError && (
            <p className={styles.input_error}>{usernameError}</p>
          )}
        </div>
        <div className="mb-6">
          <div className={styles.input_title}>Password</div>
          <div className={styles.input_wrapper}>
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <button
            type="submit"
            style={{ backgroundColor: `${loading ? "#ccc" : ""}` }}
            disabled={loading}
          >
            {loading ? "loading..." : "Log in"}
          </button>
        </div>
      </form>
      <div className={styles.hint}>
        Don’t have an account? <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};
