const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'brand-primary': '#8B4513', // SaddleBrown for a warm, earthy, premium feel
        'brand-secondary': '#D4AF37', // Gold for accents
        'brand-dark': '#1a1a1a',
        'brand-light': '#fdfdfd',
        'brand-gray': '#6b7280',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
