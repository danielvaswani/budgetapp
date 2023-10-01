import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "450px"
    }
  },
  plugins: [require("daisyui")],
} satisfies Config;
