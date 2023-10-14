/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "374px",
      // => @media (min-width: 640px) { ... }

      md: "990px",
      // => @media (min-width: 768px) { ... }

      lg: "1224px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      bleue: "#233d97",
      blue: "#1A468F",
      green: "#00C8DA",
      yellow: "#FFC709",
      white: "#FFFFFF",
      black: "#231F20",
      grey: "#494949",
    },
    fonts: {
      sans: [
        "Cabin",
        "system-ui",
        "BlinkMacSystemFont",
        "-apple-system",
        "sans-serif",
      ],
    },

    extend: {
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
        glow: "0 35px 35px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
