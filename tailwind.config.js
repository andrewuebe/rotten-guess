/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '400px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
      screens: {
        sm: '100%', // 100% width for small screens
        md: '768px', // 768px width for medium screens and up
        lg: '768px', // 768px width for large screens and up
        xl: '768px', // 768px width for extra large screens and up
        '2xl': '768px', // 768px width for 2xl screens and up
      },
    },
    extend: {
      fontFamily: {
        'rokkitt': ['"Rokkitt"', 'serif'],
        'ubuntu': ['"Ubuntu"', 'sans-serif'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3rem',
        '5xl': '4rem',
        '6xl': '5rem',
      },
      colors: {
        'corn-soup': {
          '100': '#ffffe6',
          '500': '#e5c465'
        },
        'tomato-soup': {
          '400': '#ee4244',
          '500': '#e63b3e',
          '600': '#d03538',
        },
        'eggplant': {
          '500': '#af4396',
          '600': '#8c3a7a',
          '800': '#2d0223'
        },
        'vine': {
          '500': '#63a655',
          '600': '#55854b'
        },
        'bird-egg': {
          '400': '#b3d7ff',
          '500': '#9ac2ff',
        },
        'pumpkin': {
          '400': 'f3a26b',
          '500': '#f18e3a',
        }
      }
    },
  },
  plugins: [],
}

