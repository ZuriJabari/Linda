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
        sans: ['Source Sans Pro', 'Inter', ...defaultTheme.fontFamily.sans],
        // Map serif to the same as sans to ensure no serif usage sitewide
        serif: ['Source Sans Pro', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-primary': '#111111', // Primary actions and text accents (Sussex-style black)
        'brand-secondary': '#4B5563', // Subtle gray accents
        'brand-dark': '#000000', // True black for headings and footer backgrounds
        'brand-light': '#ffffff', // Pure white background
        'brand-gray': '#374151', // Body copy gray
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
