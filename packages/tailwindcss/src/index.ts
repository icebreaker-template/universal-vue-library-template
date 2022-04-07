import type { TailwindConfig } from "tailwindcss/tailwind-config";

const preset: TailwindConfig = {
  content: ["./src/**/*.{vue,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default preset;
