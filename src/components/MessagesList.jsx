import React from "react";

// const messsages = [
//   { sender_id: 1, msg: "Hello nanba!!!", time: "10.00am", day: "today" },
//   { sender_id: 2, msg: "Hi daa", time: "10.02am", day: "today" },
//   { sender_id: 1, msg: "epdi irukka!!!", time: "10.05am", day: "today" },
//   { sender_id: 2, msg: "nalla iruken!!!", time: "10.10am", day: "today" },
//   { sender_id: 1, msg: "saptaya", time: "10.15am", day: "today" },
//   { sender_id: 2, msg: "sapten", time: "10.16am", day: "today" },
//   { sender_id: 1, msg: "nee", time: "10.18am", day: "today" },
//   { sender_id: 2, msg: "yes! nanum", time: "10.20am", day: "today" },
//   { sender_id: 1, msg: "match ennachu", time: "10.35am", day: "today" },
//   { sender_id: 2, msg: "rcb loss", time: "10.40am", day: "today" },
//   { sender_id: 1, msg: "podu maja", time: "10.45am", day: "today" },
//   { sender_id: 2, msg: "ama mameh!!!", time: "10.50am", day: "today" },
// ];

const currentUserId = 1;

const MessagesList = (props) => {
  const conversationList = props;
  console.log(conversationList);
  return (
    <div className="m-2 p-2 flex flex-col scroll-smooth overflow-y-auto hide-scroll-bar">
      {/* {messsages.map((eachMsg, index) => {
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
      })} */}
    </div>
  );
};

export default MessagesList;
