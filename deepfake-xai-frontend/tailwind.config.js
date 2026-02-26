/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#00B4D8', // Cyan
        secondary: '#8A2BE2', // Purple
        background: '#0D1117',
        foreground: '#EAEAEA',
      },
    },
  },
  plugins: [],
}
