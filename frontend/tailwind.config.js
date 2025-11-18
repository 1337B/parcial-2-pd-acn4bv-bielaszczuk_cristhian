/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a7b7',
          400: '#ed7690',
          500: '#e1466b',
          600: '#cd2a56',
          700: '#ad1f47',
          800: '#8f1d40',
          900: '#771b3a',
          950: '#430a1d',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5edd9',
          300: '#ecdfc0',
          400: '#dfc89d',
          500: '#d4b17e',
          600: '#c89a6c',
          700: '#b37f5c',
          800: '#92674e',
          900: '#765542',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

