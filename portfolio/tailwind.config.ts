import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx,md,mdx}",
    "./src/styles/**/*.{ts,tsx,scss}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", ...defaultTheme.fontFamily.sans],
        display: ["Sora", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d2e5ff",
          200: "#a5caff",
          300: "#78afff",
          400: "#4b94ff",
          500: "#1f7aff",
          600: "#0a5fd6",
          700: "#0647a3",
          800: "#032f70",
          900: "#01173d"
        },
        accent: "#7f5af0"
      }
    }
  },
  plugins: [typography]
};

export default config;
