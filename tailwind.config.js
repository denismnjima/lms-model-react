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
          DEFAULT: "#0891b2", // cyan-600
          dark: "#0e7490", // cyan-700
        },
        secondary: {
          DEFAULT: "#f97316", // orange-500
          dark: "#ea580c", // orange-600
        },
        accent: {
          DEFAULT: "#8b5cf6", // violet-500
          dark: "#7c3aed", // violet-600
        },
      },
    },
  },
  plugins: [],
}

