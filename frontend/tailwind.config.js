/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#f7edf0ff'
        },
        red: {
          DEFAULT: "#d72638ff",
        },
        black: {
          DEFAULT: "#06070eff",
        },
        gray: {
          DEFAULT: "#7e8287ff",
        },
      }
    },
  },
  plugins: [],
}