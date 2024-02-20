"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react";
import { useToken } from "../../../context/TokenContext";
import styles from "./form.module.scss";
import { motion } from "framer-motion";

interface LoginFormProps {
  changeState: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ changeState }) => {
  const router = useRouter();
  const { setAccessToken } = useToken();
  const [loading, setLoading] = useState(false);

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
        "http://localhost:8080/plagiarism/api/v1/auth/authenticate",
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
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <button
              type="submit"
              style={{ backgroundColor: `${loading ? "#ccc" : ""}` }}
              disabled={loading}
            >
              {loading ? "loading..." : "Log In"}
            </button>
          </motion.div>
        </div>
      </form>
      <div className={styles.hint}>
        Don’t have an account?{" "}
        <div className={styles.change_form_btn} onClick={changeState}>
          Create an account
        </div>
      </div>
    </div>
  );
};
