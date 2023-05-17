/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        ubuntu: ['Ubuntu'],
        rowdies: ['Rowdies'],
        rubik: ['Rubik'],
        mukta: ['Mukta']
      }
    },
  },
  plugins: [],
}