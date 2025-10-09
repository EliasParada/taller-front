/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-digital-blue': '#FAED26',
        'digital-blue-50': 'rgba(255, 251, 0, 0.5)',
      }
    },
  },
  plugins: [],
}