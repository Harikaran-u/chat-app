import React from "react";

const tempPic =
  "https://res.cloudinary.com/diuvnny8c/image/upload/v1708271782/User-Profile-PNG-Image_eyvnnm.png";

const usersArray = [
  { name: "user1", profile: tempPic, lastMessage: "Hello!!!" },
  { name: "user2", profile: tempPic, lastMessage: "oii!!!" },
  { name: "user3", profile: tempPic, lastMessage: "sip!!" },
];

const Users = () => {
  return (
    <div className="bg-whiteBg p-3 rounded-lg mt-2 h-4/5">
      <ul>
        {usersArray.map((eachUser) => {
          return (
            <li
              key={eachUser.name}
              className="flex items-center justify-between p-1 mb-1 border-b-2 border-b-gray-200 cursor-pointer"
            >
              <div className="flex items-center">
                <img src={eachUser.profile} className="w-11 h-9 rounded-full" />
                <div className="flex flex-col ml-1">
                  <p className="text-username font-semibold">{eachUser.name}</p>
                  <p className="text-xs">{eachUser.lastMessage}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
