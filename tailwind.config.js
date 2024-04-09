/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.jsx',
    './src/pages/**/*.tsx',
    './src/components/**/*.jsx',
    './src/layouts/**/*.jsx',
  ],
  theme: {
    extend: {
      spacing: {
        '19': "4.75rem",
        '101': "25.25rem",
        '128': "32rem",
        '168': "42rem",
        '210': "52.5rem",
        '225': "56.25rem",
        '175': "43.75rem",
        '320': "80rem"
      },
      backgroundImage: {
        'header': "url('@/assets/img/header1.png')"
      },
      lineHeight: {
        '18': "4.5rem"
      },
      'colors': {
        'deep-sky': "#002563",
        'deep-grey': "#727272",
        'light-grey': "#EDEDED",
        'deep-black': "#141414",
        'bg-greyB': "#F1F1F1"
      }
    }
  }
}
