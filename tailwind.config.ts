import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // This MUST be set to "class"
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#FCD34D',
          500: '#FBBF24',
          600: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
};

export default config;