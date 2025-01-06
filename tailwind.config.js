/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        elegant: ['"Playfair Display"', "serif"],
        clean: ['"Lato"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
