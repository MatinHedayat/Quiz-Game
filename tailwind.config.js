/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        cream: '#ccccca',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
