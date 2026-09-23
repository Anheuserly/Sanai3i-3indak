import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F4C81",
          dark: "#092845",
          light: "#EBF4FC",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#D97706",
          light: "#FEF3C7",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#D1FAE5",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "Cairo", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
