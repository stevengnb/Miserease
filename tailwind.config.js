/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        primary: {
          light: '#292838',
          DEFAULT: '#0d0c1d',
          dark: '#000000',
        },
        secondary: {
          light: '#2c314f',
          DEFAULT: '#161b33',
          dark: '#0b0e19',
        },
        accent: {
          light: '#f8eadd',
          DEFAULT: '#f1dac4',
          dark: '#e0c4a8',
        },
        neutral: {
          light: '#66678a',
          DEFAULT: '#474973',
          dark: '#2e304d',
        },
      },
    },
  },
  plugins: [],
};