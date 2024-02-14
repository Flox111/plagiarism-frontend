"use client"

import { useState } from "react";
import { LoginForm } from "./form/LoginForm";
import { RegisterForm } from "./form/RegisterForm";
import { motion } from "framer-motion";

export const SetupData = () => {
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
      >
    <div className="grid grid-cols-2 auto-cols-auto rounded-3xl shadow-3xl">
        {state ? (
          <LoginForm changeState={changeState} />
        ) : (
          <RegisterForm changeState={changeState} />
        )}
        <div className="bg-gradient-to-br from-[#00f09f] to-[#09f]"></div>
    </div>
    </motion.div>
  );
};
