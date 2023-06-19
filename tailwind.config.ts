import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        h3Pink: '#cf6cfa',
        h3HotPink: '#b136cc',
        h3Blue: '#2563eb',
        h3LightBlue: '#7cdaf4',
        h3Purple: '#694293',
      }
    },
  },
  plugins: [],
} satisfies Config;
