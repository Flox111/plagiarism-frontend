import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      "dark-gray": {
        5: "#101010",
        10: "#1a1a1a",
        15: "#171717",
        20: "#262626",
        30: "#323232",
        40: "#3a3a3a",
        45: "#3c3c3c",
        50: "#777",
        60: "#949494",
        70: "#b7b7b7",
        80: "#dfdfdf",
        90: "#e8e8e8",
        100: "#f5f5f5",
      },
    },
    boxShadow: {
      "3xl": "15px 15px 30px 8px rgba(0, 0, 0, 0.3)",
    },
  },
  plugins: [],
};
export default config;
