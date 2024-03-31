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
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase";
import MessagesList from "./MessagesList";
import Cookies from "js-cookie";

const ChatBox = () => {
  const [isSelectedUser, setIsSelectedUser] = useState(true);
  const [userInputMsg, setUserInputMsg] = useState("");
  const [messageId, setMessageId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
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
    // Subscribe to real-time updates
    if (messageId) {
      const documentRef = doc(db, "messages", messageId);
      const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          console.log(docSnapshot.data().messagesList);
          setConversationList(docSnapshot.data().messagesList);
        } else {
          console.log("Document does not exist");
        }
      });

      return () => unsubscribe();
    }
  }, [db]);

  const getMessagesList = async (id) => {
    if (id) {
      const messageRef = doc(db, "messages", id);
      const messageDocSnap = await getDoc(messageRef);
      if (messageDocSnap.exists()) {
        setConversationList(messageDocSnap.data().messagesList);
      } else {
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
    // getMessagesList(messageId);
    setUserInputMsg("");
  };

  return (
    <div className="rounded-lg ml-2 p-4 h-full chat-bg flex flex-col w-full relative">
      {isSelectedUser && (
        <div className="flex justify-center items-center rounded-3xl chat-info h-full w-full"></div>
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
                className="w-9 h-9 rounded-full"
              />
              <div className="flex flex-col ml-1">
                <p className="text-username text-sm font-semibold">
                  {selectedUser.username}
                </p>
                <p className="text-lastSeen text-xs">online</p>
              </div>
            </div>
            <BsThreeDotsVertical
              color="gray"
              size="20"
              className="cursor-pointer"
            />
          </div>
          <MessagesList conversationList={conversationList} />
          <form
            className={`${
              isDark ? "bg-DarkBg" : "bg-whiteBg"
            } flex items-center justify-between w-full rounded-md p-1 sticky top-3/4`}
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
              className="bg-sendBtnBg p-1 w-12 rounded flex justify-center disabled:bg-opacity-20 disabled:cursor-not-allowed"
              type="submit"
              disabled={userInputMsg === ""}
            >
              <IoSend size="20" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatBox;
