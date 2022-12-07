/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.{js, ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        display: ['Lexend', 'sans-serif']
      },
      colors: {
        orange: {
          500: "#FF7057",
          100: '#FFF9F8',
          200: '#FFF1EF'
        },
        gray:{
          50:'#FDFDFD',
          100:'#E4E4E4',
          500:'#929292'
        }
      }
    },
  },
  plugins: [],
}
