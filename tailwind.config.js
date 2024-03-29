/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    textColor: {
      title: "#5755FE",
      label: "#03051E",
      btnWhite: "#fff",
    },
    backgroundColor: {
      appBg: "#B2A4FF",
      btnBg: "#03C988",
      loginBg: "#F1F1F650",
      whiteBg: "#fff",
      transparent: "transparent",
      googleBg: "#5356FF",
    },
  },
  plugins: [],
};
