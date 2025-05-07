/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#F9F7F7',
          accent: '#3F72AF',
        },
        secondary: {
          bg: '#DBE2EF',
          accent: '#112D4E',
        },
      },
    },
  },
  plugins: [],
} 