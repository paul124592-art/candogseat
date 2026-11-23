/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'Nunito', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        leaf: {
          50: '#eef7f1',
          100: '#d7ecdf',
          500: '#2e7d5b',
          600: '#256b4d',
          700: '#1d5440',
        },
      },
    },
  },
  plugins: [],
}
