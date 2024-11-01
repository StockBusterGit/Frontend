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
      },
      fontFamily: {
        'sans': ['montserrat', 'sans-serif'],
        'serif': ['Protest Strike', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
