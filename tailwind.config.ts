import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        h3Pink: '#cc66ff',
        h3Blue: '#2563eb',
        h3LightBlue: '#7ed9f8',
        h3Purple: '#734eab',
      }
    },
  },
  plugins: [],
} satisfies Config;
