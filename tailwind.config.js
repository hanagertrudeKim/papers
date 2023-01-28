/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  extend: {
    colors: {
        'blue': '#1e3a8a',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [{ 
          }]
        }
      })
    },
  plugins: [require("@tailwindcss/typography")],
}
