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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        navy: {
          700: '#14532d',
          800: '#0f3d21',
          900: '#0a2615',
        },
        field: {
          light: '#1a7a3a',
          DEFAULT: '#15662f',
          dark: '#0f4d23',
          darker: '#0a3518',
        },
      },
      fontFamily: {
        heading: ['Anton', 'sans-serif'],
        subheading: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
