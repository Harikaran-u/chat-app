import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { format } from "date-fns";

const MessagesList = (props) => {
  const currentUserId = Cookies.get("userId");
  const { conversationList } = props;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversationList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFormattedTime = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
    const dateFromTimestamp = new Date(milliseconds);
    const formattedTime = format(dateFromTimestamp, "hh:mm aa");
    return formattedTime;
  };

  return (
    <ul className="m-2 p-2 flex flex-col scroll-smooth overflow-y-auto hide-scroll-bar">
      {conversationList.map((eachMsg) => {
        return (
          <li
            key={eachMsg.createdAt}
            className={`${
              eachMsg.senderId !== currentUserId
                ? "self-start bg-receiverBg rounded-bl-sm rounded-tr-sm mb-2"
                : "self-end bg-senderBg rounded-br-sm rounded-tl-sm mt-2"
            } p-2 rounded-2xl flex flex-col items-end`}
          >
            <span className="text-sm">{eachMsg.messageText}</span>
            <span className="delivery-time">
              {getFormattedTime(eachMsg.createdAt)}
            </span>
          </li>
        );
      })}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default MessagesList;
