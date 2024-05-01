import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      screens: {
        xxl: { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1024px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
      colors: {
        white: "#fff",
        black: "#000",
        primary: "#22467C",
        accentDark: "#777",
        accentLight: "#C9CED6",
        redDark: "#DA1B31",
        redLight: "#BF3940",
        paleBlue: "#EEF5FB",
        greenDark: "#36A93F",
        greenLight: "#0FC27B",
        lightGrey: "#C1C1C1",
        midnightAbyss: "#172337",
        lightblue: "#C6DEF1",
        ligthBlack: "#D9D9D9",
        isoGreen: "#4cd964",
        red: "#DC1B30",
        shadow: "#EDEDF6",
        lightslategrey: "#fafafa",
      },
    },
    boxShadow: {
      xl: "inset 25.5em 0 0 0 #eef5fb",
      none: "0 0 #0000",
    },
  },
  plugins: [],
};
export default config;
