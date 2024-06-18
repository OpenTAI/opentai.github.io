/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.jsx',
    './src/pages/**/*.tsx',
    './src/components/**/*.jsx',
    './src/layouts/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["-apple-system", "BlinkMacSystemFont", "PingFang-Regular", ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '19': "4.75rem",
        '22': "5.5rem",
        '74': "18.5rem",
        '101': "25.25rem",
        '108': "27rem",
        '128': "32rem",
        '168': "42rem",
        '210': "52.5rem",
        '225': "56.25rem",
        '175': "43.75rem",
        '240': "60rem",
        '320': "80rem",
        '360': "90rem"
      },
      backgroundImage: {
        'header': "url('@/assets/img/header1.png')",
        'arrowLeft': "url('@/assets/img/arrowLeft.png')",
        'arrowRight': "url('@/assets/img/arrowRight.png')",
        'arrowLeftHighlight': "url('@/assets/img/arrowLeftHighlight.png')",
        'arrowRightHighlight': "url('@/assets/img/arrowRightHighlight.png')",
        'squareArrow': "url('@/assets/img/squareArrow.png')",
        'squarePlus': "url('@/assets/img/squarePlus.png')",
        'squareMinus': "url('@/assets/img/squareMinus.png')",
      },
      lineHeight: {
        '18': "4.5rem"
      },
      'colors': {
        'deep-sky': "#002563",
        'deep-grey': "#727272",
        'light-grey': "#EDEDED",
        'deep-black': "#141414",
        'bg-greyB': "#F1F1F1",
        'light-black': "rgba(0,0,0,0.3)"
      }
    }
  }
}
