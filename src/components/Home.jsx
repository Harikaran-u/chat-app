import React, { useEffect } from "react";
import MembersBar from "./MembersBar";
import ChatBox from "./ChatBox";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  const isDark = useSelector((state) => state.chats.isDark);

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="h-screen chat-home flex flex-col items-center p-10">
      <Header />
      <div
        className={`${
          isDark ? "bg-DarkBg" : "bg-chatBannerBg"
        } flex rounded-3xl shadow-2xl p-4 mt-2 w-full h-3/4 backdrop-blur-md`}
      >
        <MembersBar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
