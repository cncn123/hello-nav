/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
      },
      backdropBlur: {
        'xl': '20px',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        twinkle: {
          '0%, 100%': {
            opacity: 0.2,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1.2)',
          },
        },
        aurora: {
          '0%, 100%': {
            opacity: 0.4,
            transform: 'translateY(0%) rotate(12deg)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'translateY(1%) rotate(12deg)',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        blob: 'blob 7s infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        aurora: 'aurora 15s ease-in-out infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
