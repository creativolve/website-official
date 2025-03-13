/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '480px', // Mobile kecil
        'md': '744px', // Tablet
        'lg': '1024px', // Laptop
        'xl': '1280px', // Desktop besar
        '2xl': '1536px', // Monitor besar
      },
    },
  },
  plugins: [],
};
