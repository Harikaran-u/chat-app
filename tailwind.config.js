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
      online: "#65C18C",
      offline: "#FF6363",
      textLight: "#FFF7F1",
      onlineDot: "#65C18C",
      offlineDot: "#FF7BA9",
    },
    backgroundColor: {
      appBg: "#B2A4FF",
      btnBg: "#03C988",
      loginBg: "#F1F1F690",
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
      selectUserBg: "#7B66FF",
      toggleBg: "#DCBFFF",
      DarkBg: "#0F0F0F",
    },
  },
  plugins: [],
};
