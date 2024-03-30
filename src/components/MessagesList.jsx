import React from "react";

const messsages = [
  { sender_id: 1, msg: "Hello nanba!!!", time: "10.00am", day: "today" },
  { sender_id: 2, msg: "Hi daa", time: "10.02am", day: "today" },
  { sender_id: 1, msg: "epdi irukka!!!", time: "10.05am", day: "today" },
  { sender_id: 2, msg: "nalla iruken!!!", time: "10.10am", day: "today" },
];

const currentUserId = 1;

const MessagesList = () => {
  return (
    <div className="m-2 p-2 flex flex-col">
      {messsages.map((eachMsg, index) => {
        return (
          <p
            key={index}
            className={`${
              eachMsg.sender_id !== currentUserId
                ? "self-start bg-receiverBg rounded-bl-sm rounded-tr-sm"
                : "self-end bg-senderBg rounded-br-sm rounded-tl-sm"
            } text-sm  p-2 rounded-2xl border-solid`}
          >
            {eachMsg.msg}
          </p>
        );
      })}
    </div>
  );
};

export default MessagesList;
