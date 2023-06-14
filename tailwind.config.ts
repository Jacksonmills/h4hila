import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#cc66ff',
        secondary: '#2563eb',
      }
    },
  },
  plugins: [],
} satisfies Config;
