import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { db } from "../config/firebase";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const userId = Cookies.get("userId");
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userDoc = doc(db, "users", userId);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center bg-whiteBg p-1 rounded-lg">
      <div className="flex items-center">
        <img src={userData.profilePic} className="w-9 h-9 rounded-full" />
        <p className="ml-1 text-username text-sm font-semibold">
          {userData.username}
        </p>
      </div>
      <BsThreeDotsVertical color="gray" size="20" className="cursor-pointer" />
    </div>
  );
};

export default Profile;
