/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl-extra': '7px 10px 15px 10px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}