/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Nanum Gothic"],
      },
      animation: {
        moving: 'moving 3s linear infinite'
      },

      keyframes: {
        moving: {
          '0%, 100%': { transform: 'translateY(0rem)' },
          '50%': { transform: 'translateY(0.22rem)' }
        }
      }
    }
  },
  plugins: []
};
