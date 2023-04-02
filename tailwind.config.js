/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./views/*.{ejs,html}", 
    "./views/index.ejs"
  ],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
      },
    },
    colors: {
      "astro-blue": "#56AEFF",
      "button-blue" : "#405cf5",
      "astro-black": "#1C2120",
      "text-color": "#203454",
      "astro-yellow": "#F7FF58",
      "alice-blue": "#F0F8FF",
      "sub-text": "#4B4B4B",
      success: "#90EE90",
      error: "#EC3F3F",
      "background-grey": "#e9edf2",
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      green: colors.green,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      blue: colors.blue,
      violet: colors.violet,
      purple: colors.purple,
      pink: colors.pink,
      rose: colors.rose,
      slate: colors.slate,
    },
    fontFamily: {
      "shadows-light": ["Shadows Into Light", "cursive"],
      baloo: ["Baloo-2", "cursive"],
      roboto: ["Roboto", "cursive"],
      poppins: ["Poppins", "sans-serif"],
    },
    animation: {
      "gradient-x": "gradient-x 15s ease infinite",
      "gradient-y": "gradient-y 15s ease infinite",
      "gradient-xy": "gradient-xy 15s ease infinite",
    },
    keyframes: {
      "gradient-y": {
        "0%, 100%": {
          "background-size": "400% 400%",
          "background-position": "center top",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "center center",
        },
      },
      "gradient-x": {
        "0%, 100%": {
          "background-size": "200% 200%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
      "gradient-xy": {
        "0%, 100%": {
          "background-size": "400% 400%",
          "background-position": "left center",
        },
        "50%": {
          "background-size": "200% 200%",
          "background-position": "right center",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require('flowbite/plugin'),
  ],
  corePlugins: {
    
  },
};
