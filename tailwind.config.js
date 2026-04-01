/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9ed',
          100: '#b3eece',
          200: '#80e3af',
          300: '#4dd890',
          400: '#26cf79',
          500: '#00A651',
          600: '#008C44',
          700: '#007338',
          800: '#005A2B',
          900: '#00401F',
        },
        field: {
          light: '#00B85C',
          DEFAULT: '#00A651',
          dark: '#008C44',
          darker: '#007338',
        },
      },
      fontFamily: {
        heading: ['Chilidog PB', 'cursive'],
      },
    },
  },
  plugins: [],
}
