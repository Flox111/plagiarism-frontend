"use client"

import { FC, useState } from "react";
import { LoginForm } from "./form/LoginForm";
import { RegisterForm } from "./form/RegisterForm";
import { motion } from "framer-motion";

export const SetupData:FC = () => {
  const [state, setState] = useState<boolean>(true);

  const changeState = () => {
    setState(!state);
  }

  return (
    <motion.div 
        key={state ? 'login' : 'register'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col justify-center items-center min-h-screen"
      >
    <div className="grid grid-cols-2 auto-cols-auto rounded-3xl shadow-3xl">
        {state ? (
          <LoginForm changeState={changeState} />
        ) : (
          <RegisterForm changeState={changeState} />
        )}
        <div className="bg-gradient-to-br from-[#255ff4] to-[#f425c7]"></div>
    </div>
    </motion.div>
  );
};
