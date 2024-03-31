import React from "react";
import { MdOutlineClose, MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { resetState, updateTheme } from "../context/chatSlice";
import Cookies from "js-cookie";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const UserMenu = (props) => {
  const { toggle } = props;
  const isDark = useSelector((state) => state.chats.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userId = Cookies.get("userId");
    const result = window.confirm("Are you sure want to logout?");
    if (result) {
      try {
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, {
          isOnline: false,
          logoutTime: new Date(),
        });
        Cookies.remove("userId");
        dispatch(resetState());
        navigate("/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      <button className="text-sm font-semibold" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default UserMenu;
