/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#854d3d",
        secondary: "#4a1e1b",
        brandDark: "#270c03",
        dark: "#1e1e1e",
        light: "#f5f5f5",
        customYellow: '#FFF5E1',
        
      },
    },
  },
  plugins: [],
});

