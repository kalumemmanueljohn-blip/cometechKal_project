/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0e17',
          light: '#141b2b',
          medium: '#1a2335',
          card: '#1e2842',
        },
        gold: {
          DEFAULT: '#d4a853',
          light: '#e8c170',
          dark: '#b8923f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4a853 0%, #e8c170 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0e17 0%, #141b2b 100%)',
      }
    },
  },
  plugins: [],
}