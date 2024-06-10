/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        disabled: "#9CA3AF",
        blue: {
          100: "#ACD2FF",
          200: "#98C7FF",
          300: "#84BDFF",
          400: "#71B2FF",
          500: "#5DA7FF",
          600: "#4A9DFF",
          default: "#3692FF",
          800: "#3681FF",
          900: "#3671FF",
          999: "#3660FF",
        },
        gray: {
          default: "#9CA3AF",
        },
        hover: {
          gray: "#F3F4F6",
          blue: "#1967D6",
        },
        active: {
          gray: "#ACD2FF",
          blue: "#1251AA",
          red: "#F74747",
        },
      },
      borderRadius: {
        button: "8px",
        box: "12px",
      },
    },
  },
  plugins: [],
};
