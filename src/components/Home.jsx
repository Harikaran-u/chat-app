import React from "react";
import MembersBar from "./MembersBar";
import ChatBox from "./ChatBox";
import Header from "./Header";

const Home = () => {
  return (
    <div className="h-screen bg-chatHomeBg flex flex-col items-center p-4">
      <Header />
      <div className="bg-whiteBg flex justify-between rounded-3xl shadow-2xl p-3 h-3/4 w-full backdrop-blur-md">
        <MembersBar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
