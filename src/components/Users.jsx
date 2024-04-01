import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection, onSnapshot, doc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedUser } from "../context/chatSlice";
import { GoDotFill } from "react-icons/go";
import Cookies from "js-cookie";
import Loader from "./Loader";

const Users = () => {
  const [userSearch, setUserSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ doc_id: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useSelector((state) => state.chats.isDark);
  const dispatch = useDispatch();

  const userId = Cookies.get("userId");

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];

      querySnapshot.forEach((doc) => {
        if (doc.id !== userId) {
          const userObj = { doc_id: doc.id, ...doc.data() };
          usersData.push(userObj);
        }
      });
      setUsersList([...usersData]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const documentRef = collection(db, "users");
    let usersData = [];
    const unsubscribe = onSnapshot(documentRef, (snapshot) => {
      if (snapshot) {
        snapshot.forEach((eachDoc) => {
          if (userId !== eachDoc.id) {
            let userData = { doc_id: eachDoc.id, ...eachDoc.data() };
            usersData.push(userData);
          }
        });

        setUsersList([...usersData]);
        usersData = [];
      } else {
        console.log("Document does not exist");
      }
    });

    return () => unsubscribe();
  }, [db]);

  const handleUserSearch = (e) => {
    const value = e.target.value;
    setUserSearch(value);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    const selectUser = {
      ...user,
      loginTime: user.loginTime.toMillis(),
      logoutTime: user.logoutTime?.toMillis(),
    };
    dispatch(updateSelectedUser(selectUser));
    setUserSearch("");
  };

  const filteredUsersList = usersList.filter((eachUser) =>
    eachUser.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div
      className={`${
        isDark ? "bg-DarkBg" : "bg-whiteBg"
      } p-3 rounded-lg mt-2 h-full overflow-y-scroll hide-scroll-bar`}
    >
      <input
        type="search"
        placeholder="search users..."
        className={`${
          isDark ? "bg-DarkBg text-btnWhite" : "bg-whiteBg text-label"
        } outline-none p-1 rounded-sm text-xs font-semibold border-b-2 border-cyan-400 w-full h-8`}
        value={userSearch}
        onChange={handleUserSearch}
      />
      <p className="text-base text-center font-semibold text-category mb-2 mt-2">
        users
      </p>
      {!isLoading && (
        <ul
          className={`${
            isDark ? "bg-DarkBg" : "bg-whiteBg"
          } h-3/4 overflow-y-auto hide-scroll-bar p-1 rounded`}
        >
          {filteredUsersList !== null &&
            filteredUsersList.map((eachUser) => {
              return (
                <li
                  key={eachUser.doc_id}
                  className={`flex items-center justify-between rounded-md p-1 mb-1 border-b-2 border-b-gray-200 cursor-pointer border-solid ${
                    eachUser.doc_id === selectedUser.doc_id && "bg-selectUserBg"
                  }`}
                  onClick={() => handleSelectUser(eachUser)}
                >
                  <div className="flex ">
                    <img
                      src={eachUser.profilePic}
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex flex-col ml-1">
                      <p
                        className={`${
                          eachUser.doc_id === selectedUser.doc_id
                            ? "text-textLight"
                            : "text-personName"
                        } font-semibold text-sm`}
                      >
                        {eachUser.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p
                      className={`text-xs font-semibold mr-1 text-lastSeen  ${
                        eachUser.isOnline
                          ? "animate-pulse text-onlineDot"
                          : "text-offlineDot"
                      }`}
                    >
                      <GoDotFill size="20" />
                    </p>
                    {/* <p className="text-xs text-lastSeen">{eachUser.time}</p> */}
                  </div>
                </li>
              );
            })}
        </ul>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default Users;
