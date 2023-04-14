/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        goOnline:"#0E0D0C",
        goOnline1:"#171819",
        bodyBackground:"#eeeeee"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        merry: ['Merriweather', 'sans-serif']
      },
    },
  },
  rippleui:{
    theme:false
  },
  plugins: [
  require("tw-elements/dist/plugin")
],
}
