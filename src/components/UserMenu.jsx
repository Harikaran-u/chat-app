import React from "react";
import { MdOutlineClose, MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "../context/chatSlice";

const UserMenu = (props) => {
  const { toggle } = props;

  const isDark = useSelector((state) => state.chats.isDark);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 right-0 p-1 m-1 flex flex-col justify-between items-end bg-toggleBg rounded-md h-36 w-36 overflow-y-auto">
      <MdOutlineClose
        size="20"
        className="cursor-pointer"
        onClick={() => toggle(false)}
      />
      {isDark ? (
        <MdLightMode
          size="20"
          className="cursor-pointer"
          onClick={() => dispatch(updateTheme())}
        />
      ) : (
        <MdDarkMode
          size="20"
          className="cursor-pointer"
          onClick={() => dispatch(updateTheme())}
        />
      )}

      <button className="text-sm font-semibold">update profile</button>
      <button className="text-sm font-semibold">logout</button>
    </div>
  );
};

export default UserMenu;
