import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import { useSelector } from "react-redux";

const Header = () => {
  const isDark = useSelector((state) => state.chats.isDark);

  return (
    <h1
      className={`${
        isDark ? "bg-DarkBg" : "bg-whiteBg"
      } flex items-center justify-center p-2 text-sm sm:text-4xl font-bold text-title mb-2 rounded-tr-3xl rounded-bl-3xl`}
    >
      Chat Hub <IoIosChatboxes className="ml-2" />
    </h1>
  );
};

export default Header;
