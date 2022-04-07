/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{vue,html,js}'],
  theme: {
    extend: {}
  },
  plugins: [],
  presets: [require('@icebreakers/tailwindcss-preset')]
}
