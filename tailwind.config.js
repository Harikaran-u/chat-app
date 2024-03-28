/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    textColor: {
      title: "#03C988",
      label: "#03051E",
    },
    backgroundColor: {
      appBg: "#B2A4FF",
      btnBg: "#03C988",
      loginBg: "#F1F1F6",
      transparent: "transparent",
    },
  },
  plugins: [],
};
