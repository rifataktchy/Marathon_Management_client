/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "rgb(154 52 18 / var(--tw-bg-opacity, 1))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

}

