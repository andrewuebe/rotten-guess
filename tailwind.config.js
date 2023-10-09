/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bagelfat': ['"Bagel Fat One"', 'sans-serif'],
        'montserrat': ['"Montserrat Alternates"', 'sans-serif'],
      },
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.5rem',  // Overriding the default 'xl' size
        '2xl': '2rem',   // Overriding the default '2xl' size
        '3xl': '2.5rem', // Adding new size for '3xl'
        '4xl': '3rem',   // Adding new size for '4xl'
        '5xl': '4rem',   // Adding new size for '5xl'
        // ... add or override more sizes as needed
      },
    },
  },
  plugins: [],
}

