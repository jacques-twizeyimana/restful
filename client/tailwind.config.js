/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#EBF7FF",
          500: "#EBF7FF",
          600: "#016FB9",
        },
      },
    },
  },
  plugins: [],
};
