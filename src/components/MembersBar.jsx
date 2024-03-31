import React from "react";
import Profile from "./Profile";
import Users from "./Users";

const MembersBar = () => {
  return (
    <div className="bg-membersBg rounded-lg p-4 w-2/4 h-full flex flex-col">
      <Profile />
      <Users />
    </div>
  );
};

export default MembersBar;
