import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = () => {
  return (
    <div className="flex justify-between items-center bg-whiteBg p-1 rounded-lg">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/diuvnny8c/image/upload/v1708271782/User-Profile-PNG-Image_eyvnnm.png"
          className="w-11 h-9 rounded-full"
        />
        <p className="ml-1 text-username text-sm font-semibold">Sanju</p>
      </div>
      <BsThreeDotsVertical color="gray" size="20" className="cursor-pointer" />
    </div>
  );
};

export default Profile;
