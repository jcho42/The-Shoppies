const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    "./src/**/*.jsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: colors.trueGray
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
