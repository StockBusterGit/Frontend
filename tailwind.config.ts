import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#784923",
        secondary: "#DBA75F",
        tertiary: "#DBA75F",
        tertiaryDark: "#B07A50",
        tertiaryLight: "#F0D9BA",
        darkPrimary: "#4F4F4F",
        darkSecondary: "#9B9B9B",
      },
      fontFamily: {
        'sans': ['montserrat', 'sans-serif'],
        'serif': ['Protest Strike', 'serif'],
      }
    },
  },
  darkMode: 'class', // Active le mode sombre basé sur la classe
  plugins: [],
};
export default config;
