import React from "react";
import {
  MdLogout,
  MdLightMode,
  MdDarkMode,
  MdEditSquare,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { resetState, updateTheme } from "../context/chatSlice";
import Cookies from "js-cookie";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const UserMenu = (props) => {
  // const { toggle } = props;
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
    <div className="flex items-center">
      {isDark ? (
        <MdLightMode
          className={`${
            isDark ? "text-actionBtnLight" : "text-label"
          } cursor-pointer text-sm sm:text-lg mr-2`}
          onClick={() => dispatch(updateTheme())}
        />
      ) : (
        <MdDarkMode
          className="cursor-pointer text-sm sm:text-lg mr-2"
          onClick={() => dispatch(updateTheme())}
        />
      )}
      <Link to="/update" className="decoration-transparent">
        <MdEditSquare
          className={`${
            isDark ? "text-actionBtnLight" : "text-label"
          } cursor-pointer text-sm sm:text-lg mr-2`}
        />
      </Link>
      <MdLogout
        className={`${
          isDark ? "text-actionBtnLight" : "text-label"
        } cursor-pointer text-sm sm:text-lg`}
        onClick={handleLogout}
      />
    </div>
  );
};

export default UserMenu;
