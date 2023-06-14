import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'primary': '#c416f0',
      'secondary': '#2751f7',
      'tertiary': '#2e17e7',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
