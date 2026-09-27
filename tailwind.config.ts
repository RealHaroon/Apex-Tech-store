import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1E2761",
        "navy-deep": "#141A47",
        "navy-mid": "#263A8A",
        ice: "#F3F5FC",
        ink: "#1B1F3B",
        muted: "#5B6178",
        gold: "#E8B84B",
        "gold-deep": "#C99B32",
        line: "#E1E5F0",
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        wrap: "1120px",
      },
      boxShadow: {
        chat: "0 30px 60px -20px rgba(20,26,71,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
