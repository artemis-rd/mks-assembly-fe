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
          200: '#FFF9F8',
          100: '#FFF1EF'
        }
      }
    },
  },
  plugins: [],
}
