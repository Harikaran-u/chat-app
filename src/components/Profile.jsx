import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [togglePopUp, setTogglePopUp] = useState(false);
  const userId = Cookies.get("userId");
  const isDark = useSelector((state) => state.chats.isDark);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userDoc = doc(db, "users", userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleMenu = (value) => {
    setTogglePopUp(value);
  };

  return (
    <div
      className={`flex justify-between items-center ${
        isDark ? "bg-DarkBg" : "bg-whiteBg"
      } p-1 rounded-lg relative`}
    >
      <div className="flex items-center">
        <img src={userData.profilePic} className="w-9 h-9 rounded-full" />
        <p className="ml-1 text-username text-sm font-semibold">
          {userData.username}
        </p>
      </div>
      {!togglePopUp && (
        <BsThreeDotsVertical
          color="gray"
          size="20"
          className="cursor-pointer"
          onClick={() => handleToggleMenu(true)}
        />
      )}

      {togglePopUp && <UserMenu toggle={handleToggleMenu} />}
    </div>
  );
};

export default Profile;
