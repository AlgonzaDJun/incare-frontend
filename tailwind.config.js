/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#435EBE",
        "netral-bluesky": "#F2F7FF",
        "netral-white": "#FFFFFF",
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
