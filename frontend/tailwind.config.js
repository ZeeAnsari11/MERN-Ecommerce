/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm:  {'max' :"430px"},
      md:  {'max' :"620px"},
      lg:  {'max' :"768px"},
      xl:  {'max' :"1080px"}
 } 
  },
  plugins: [],
}
