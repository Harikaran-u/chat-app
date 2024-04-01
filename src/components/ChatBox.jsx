import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  Timestamp,
  arrayUnion,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import MessagesList from "./MessagesList";
import Cookies from "js-cookie";
import { formatRelative } from "date-fns";

const ChatBox = () => {
  const [isSelectedUser, setIsSelectedUser] = useState(true);
  const [userInputMsg, setUserInputMsg] = useState("");
  const [messageId, setMessageId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [conversationList, setConversationList] = useState([]);
  const selectedUser = useSelector((state) => state.chats.selectedUser);
  const isDark = useSelector((state) => state.chats.isDark);

  useEffect(() => {
    const userId = Cookies.get("userId");
    const selectedUserId = selectedUser.doc_id;
    setCurrentUserId(userId);
    setSelectedUserId(selectedUserId);
    const messagesDocId =
      userId > selectedUserId
        ? userId + selectedUserId
        : selectedUserId + userId;
    setMessageId(messagesDocId);

    if (selectedUser.username !== undefined) {
      setIsSelectedUser(false);
    }
    getMessagesList(messagesDocId);
  }, [selectedUser]);

  useEffect(() => {
    if (messageId) {
      const documentRef = doc(db, "messages", messageId);
      const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setConversationList(docSnapshot.data().messagesList);
        } else {
          console.log("Document does not exist");
        }
      });

      return () => unsubscribe();
    }
  }, [db, msgSent, messageId]);

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = formatRelative(date, new Date());
    return formattedDate;
  };

  const getMessagesList = async (id) => {
    if (id) {
      const messageRef = doc(db, "messages", id);
      const messageDocSnap = await getDoc(messageRef);
      if (messageDocSnap.exists()) {
        setConversationList(messageDocSnap.data().messagesList);
      } else {
        setConversationList([]);
        console.log("no messages found");
      }
    }
  };

  const submitMsgDocument = async () => {
    try {
      const messageRef = doc(db, "messages", messageId);
      const messageDocSnap = await getDoc(messageRef);

      const messageDoc = {
        messageText: userInputMsg,
        createdAt: Timestamp.now(),
        senderId: currentUserId,
        receiverId: selectedUserId,
      };
      if (messageDocSnap.exists()) {
        await updateDoc(messageRef, {
          messagesList: arrayUnion(messageDoc),
        });
      } else {
        await setDoc(messageRef, {
          messagesList: arrayUnion(messageDoc),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserInputSubmit = (e) => {
    e.preventDefault();
    submitMsgDocument();
    setUserInputMsg("");
    setMsgSent(true);
  };

  return (
    <div className="rounded-lg sm:ml-2 p-2 mt-2 sm:mt-0 sm:p-4 min-h-full xs-height chat-bg flex flex-col w-full relative">
      {isSelectedUser && (
        <div className="rounded-3xl chat-info h-96 sm:h-full w-full"></div>
      )}
      {!isSelectedUser && (
        <>
          <div
            className={`${
              isDark ? "bg-DarkBg" : "bg-whiteBg"
            } flex items-center justify-between p-1 border-b-2 border-b-cyan-400 rounded sticky w-full`}
          >
            <div className="flex items-center ml-1">
              <img
                src={selectedUser.profilePic}
                className="h-7 w-7 sm:w-9 sm:h-9 rounded-full"
              />
              <div className="flex flex-col ml-1">
                <p className="text-username text-xs sm:text-sm font-semibold">
                  {selectedUser.username}
                </p>
                <p
                  className={`${
                    selectedUser.isOnline ? "text-online" : "text-offline"
                  } text-light sm:text-xs font-semibold`}
                >
                  {selectedUser.isOnline
                    ? "online"
                    : `last seen ${getFormattedDate(selectedUser.logoutTime)}`}
                </p>
              </div>
            </div>
            <BsThreeDotsVertical
              color="gray"
              className="cursor-pointer text-sm sm:text-base"
            />
          </div>
          <MessagesList conversationList={conversationList} />
          <form
            className={`${
              isDark ? "bg-DarkBg" : "bg-whiteBg"
            } flex items-center justify-between w-full rounded-md p-1 sticky top-full`}
            onSubmit={handleUserInputSubmit}
          >
            <input
              type="text"
              placeholder="type something..."
              className={`${
                isDark ? "text-btnWhite" : "text-label"
              } p-1 text-xs font-semibold bg-transparent w-4/5 outline-none`}
              value={userInputMsg}
              onChange={(e) => setUserInputMsg(e.target.value)}
            />
            <button
              className="bg-sendBtnBg p-1 w-8 sm:w-12 rounded flex justify-center disabled:bg-opacity-20 disabled:cursor-not-allowed"
              type="submit"
              disabled={userInputMsg === ""}
            >
              <IoSend className="text-base sm:text-lg" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBox;
