import React from "react";
import { IoIosChatboxes } from "react-icons/io";

const Header = () => {
  return (
    <h1 className="flex items-center justify-center bg-whiteBg p-2 text-sm sm:text-4xl font-bold text-title mb-2 rounded-tr-3xl rounded-bl-3xl">
      Chat Hub <IoIosChatboxes className="ml-2" />
    </h1>
  );
};

export default Header;
