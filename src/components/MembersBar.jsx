import React from "react";
import Profile from "./Profile";
import Users from "./Users";
import { IoIosChatboxes } from "react-icons/io";
import { useSelector } from "react-redux";

const MembersBar = () => {
  const isDark = useSelector((state) => state.chats.isDark);
  return (
    <div className="bg-membersBg rounded-lg p-2 sm:w-80 md:w-96 lg:w-large h-full flex flex-col">
      <h1
        className={`${
          isDark ? "bg-DarkBg" : "bg-whiteBg"
        } sm:hidden flex justify-center items-center w-28 text-online text-center self-center font-bold text-sm mb-2 rounded-tr-xl rounded-bl-xl`}
      >
        Chat Hub <IoIosChatboxes className="ml-2" />
      </h1>
      <Profile />
      <Users />
    </div>
  );
};

export default MembersBar;
