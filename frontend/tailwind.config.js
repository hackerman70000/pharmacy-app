/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          dark: '#0369A1',
        },
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#F1F5F9',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#F8FAFC',
        },
        text: {
          DEFAULT: '#1E293B',
          light: '#475569',
          dark: '#0F172A',
        }
      }
    },
  },
  plugins: [],
}