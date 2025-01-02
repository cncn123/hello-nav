/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
