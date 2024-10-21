/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gymColor": "#52AB99",
        buttonColor:"#F4F4F4"
      }
    },
  },
  plugins: [],
}

