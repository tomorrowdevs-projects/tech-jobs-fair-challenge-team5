/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arimo: ["Arimo", "sans-serif"],
      },
      colors: {
        primary: "#1B84B1",
        secondary: "#A09E9E",
        tertiary: "#A09E9E",
        main: "#FFEBCD",
        danger: "#F27F7F",
        success: "#57B482",
      },
    },
  },
  plugins: [],
};