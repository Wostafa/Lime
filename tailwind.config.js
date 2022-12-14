/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#26B093',
        crayola: '#E5C093',
        'crayola-dark': '#D89A50',
        'gray-darker': '#383333',
        'gray-lighter': '#EDEDED',
        'pink': '#F54A73',
        'black10': "#0000001A",
        'sky-blue-soft': '#eef5fa'
      },
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 1.7s linear infinite',
      }
    },
    screens: {
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    }
  },
  plugins: [],
};
