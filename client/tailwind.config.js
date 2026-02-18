/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vaticanGold: '#FFD700',
        vaticanWhite: '#FFFFFF',
        deepCardinal: '#C41E3A',
      },
    },
  },
  plugins: [],
}