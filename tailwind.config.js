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
      },
      zIndex: {
        '-10': '-10',
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
