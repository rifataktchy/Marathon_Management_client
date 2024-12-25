/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "rgba(236, 100, 8, 0.837)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

}

