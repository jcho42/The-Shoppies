const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './build/**/*.html',
    './app/**/*.js',
    "./app/**/*.jsx"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        grey: colors.trueGray
      },
      height: {
        '9/10': '90%'
      },
      width: {
        leftSide: 'calc(100vw - 24rem)'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
}
