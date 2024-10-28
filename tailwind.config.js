/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeSlide: {
          '0%': { right: '0%', opacity: '0' },
          '25%': { opacity: '1' },
          '75%': { opacity: '1' },
          '100%': { right: '100%', opacity: '0' },
        },
      },
      animation: {
        'fade-slide': 'fadeSlide 2s linear infinite',
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))", // Add a 16-column grid
      },
    },
  },
  plugins: [],
}

