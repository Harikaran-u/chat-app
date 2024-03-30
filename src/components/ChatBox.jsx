import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MessagesList from "./MessagesList";

const ChatBox = () => {
  return (
    <div className="bg-chatBoxBg ml-4 p-4 rounded-xl w-full">
      <div className="rounded-lg p-4 h-full chat-bg flex flex-col">
        <div className="flex items-center justify-between p-1 border-b-2 bg-whiteBg border-b-cyan-400 rounded">
          <div className="flex items-center ml-1">
            <img
              src="https://res.cloudinary.com/diuvnny8c/image/upload/v1708271782/User-Profile-PNG-Image_eyvnnm.png"
              className="w-12 h-9"
            />
            <div className="flex flex-col">
              <p className="text-username text-sm font-semibold">Kumar</p>
              <p className="text-lastSeen text-xs">Online</p>
            </div>
          </div>
          <BsThreeDotsVertical
            color="gray"
            size="20"
            className="cursor-pointer"
          />
        </div>
        <MessagesList />
        <div className="flex items-center">
          <input
            type="text"
            placeholder="..."
            className="rounded-xl p-1 font-xs text-label font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
