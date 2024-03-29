import React from "react";
import { IoIosChatboxes } from "react-icons/io";

const Header = () => {
  return (
    <h1 className="flex items-center justify-center text-sm sm:text-4xl font-bold text-title mb-2">
      Chat Hub <IoIosChatboxes className="ml-2" />
    </h1>
  );
};

export default Header;
