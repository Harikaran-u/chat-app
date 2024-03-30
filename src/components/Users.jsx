import React, { useState } from "react";

const tempPic =
  "https://res.cloudinary.com/diuvnny8c/image/upload/v1708271782/User-Profile-PNG-Image_eyvnnm.png";

const usersArray = [
  {
    name: "user1",
    profile: tempPic,
    lastMessage: "Hello!!!",
    lastSeen: "Yesterday",
    time: "11:30pm",
  },
  {
    name: "user2",
    profile: tempPic,
    lastMessage: "oii!!!",
    lastSeen: "Today",
    time: "1:10am",
  },
  {
    name: "user3",
    profile: tempPic,
    lastMessage: "sip!!",
    lastSeen: "Today",
    time: "10:02am",
  },
  {
    name: "user4",
    profile: tempPic,
    lastMessage: "Hello!!!",
    lastSeen: "Yesterday",
    time: "11:30pm",
  },
  {
    name: "user5",
    profile: tempPic,
    lastMessage: "oii!!!",
    lastSeen: "Today",
    time: "1:10am",
  },
  {
    name: "user6",
    profile: tempPic,
    lastMessage: "sip!!",
    lastSeen: "Today",
    time: "10:02am",
  },
];

const Users = () => {
  const [userSearch, setUserSearch] = useState("");
  return (
    <div className="bg-whiteBg p-3 rounded-lg mt-2 ">
      <input
        type="search"
        placeholder="search friends..."
        className="outline-none p-1 rounded-sm text-xs font-semibold border-b-2 border-cyan-400 w-full"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <p className="text-base font-semibold text-category mb-2">friends</p>
      <ul className="bg-whiteBg h-56 overflow-y-auto user-scroll">
        {usersArray.map((eachUser) => {
          return (
            <li
              key={eachUser.name}
              className="flex items-center justify-between rounded-md p-1 mb-2 border-b-2 border-b-gray-200 cursor-pointer border-l-4 border-l-cyan-400 border-solid"
            >
              <div className="flex items-center">
                <img src={eachUser.profile} className="w-11 h-9 rounded-full" />
                <div className="flex flex-col ml-1">
                  <p className="text-personName font-semibold text-base">
                    {eachUser.name}
                  </p>
                  <p className="text-xs text-lastMsg">{eachUser.lastMessage}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-xs mr-1 text-lastSeen">
                  {eachUser.lastSeen}
                </p>
                <p className="text-xs text-lastSeen">{eachUser.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
