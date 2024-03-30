/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    textColor: {
      title: "#5755FE",
      label: "#03051E",
      btnWhite: "#fff",
      username: "#5356FF",
      category: "#1AACAC",
      personName: "#865DFF",
      lastMsg: "#152D35",
      lastSeen: "#C7C8CC",
    },
    backgroundColor: {
      appBg: "#B2A4FF",
      btnBg: "#03C988",
      loginBg: "#F1F1F650",
      whiteBg: "#fff",
      transparent: "transparent",
      googleBg: "#5356FF",
      chatBg: "#DDDDDD50",
      chatHomeBg: "#EAE7AF",
      chatBannerBg: "#F1F6F9",
      membersBg: "#7B66FF",
      chatBoxBg: "#03C988",
      senderBg: "#4CCD99",
      receiverBg: "#C499F3",
      sendBtnBg: "#5FBDFF",
    },
  },
  plugins: [],
};
