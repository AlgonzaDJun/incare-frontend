/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#435EBE",
        "incare-primary": "#435EBE",
        "netral-bluesky": "#F2F7FF",
        "netral-white": "#FFFFFF",
        "incare-darker": "#2e4185",
        "landing-secondary" : "#A0E4F1"
      },
      fontFamily: {
        nunito: ["Nunito"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
