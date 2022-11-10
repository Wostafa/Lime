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
      },
      fontFamily: {
        sans: ['Open Sans', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
