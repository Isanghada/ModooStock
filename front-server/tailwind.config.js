/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Nanum Gothic"],
        nanum: ["Nanum Gothic"],
      },
      animation: {
        moving: 'moving 3s linear infinite'
      },

      keyframes: {
        moving: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(0.22rem)' }
        },
        ring: {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '10%': {
            transform: 'rotate(15deg)'
          },
          '20%': {
            transform: 'rotate(-15deg)'
          },
          '30%': {
            transform: 'rotate(10deg)'
          },
          '40%': {
            transform: 'rotate(-10deg)'
          },
          '50%': {
            transform: 'rotate(5deg)'
          },
          '60%': {
            transform: 'rotate(-5deg)'
          },
          '70%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(0deg)'
          }
        }
      }
    }
  },
  plugins: []
};
