import React from "react";
import MembersBar from "./MembersBar";
import ChatBox from "./ChatBox";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  if (!userId) {
    navigate("/login", { replace: true });
  }

  return (
    <div className="h-screen chat-home flex flex-col items-center p-10">
      <Header />
      <div className="bg-chatBannerBg flex rounded-3xl shadow-2xl p-4 mt-2 w-full h-3/4 backdrop-blur-md">
        <MembersBar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
