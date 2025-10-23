/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        'digital-blue': '#0066FF',
        'digital-blue-50': 'rgba(38, 0, 255, 0.5)',
      }
      
    },
  },
  plugins: [],
}