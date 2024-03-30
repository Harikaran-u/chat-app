import React from "react";
import { MdOutlineClose, MdLightMode } from "react-icons/md";

const UserMenu = (props) => {
  const { toggle } = props;

  return (
    <div className="absolute top-0 right-0 p-1 m-1 flex flex-col justify-between items-end bg-toggleBg rounded-md h-36 w-36 overflow-y-auto">
      <MdOutlineClose
        size="20"
        className="cursor-pointer"
        onClick={() => toggle(false)}
      />
      <MdLightMode size="20" className="cursor-pointer" />
      <button className="text-sm font-semibold">update profile</button>
      <button className="text-sm font-semibold">logout</button>
    </div>
  );
};

export default UserMenu;
