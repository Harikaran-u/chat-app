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
  const [isError, setIsError] = useState(false);
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
      setIsError(true);
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
        setIsError(true);
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
      } p-2 rounded-lg mt-2 h-full overflow-auto hide-scroll-bar`}
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

      {!isLoading && (
        <ul
          className={`${
            isDark ? "bg-DarkBg" : "bg-whiteBg"
          } overflow-auto hide-scroll-bar p-1 rounded flex sm:flex-col sm:h-full sm:border-b-0 border-b-2 border-solid border-b-cyan-400`}
        >
          {filteredUsersList !== null &&
            filteredUsersList.map((eachUser) => {
              return (
                <li
                  key={eachUser.doc_id}
                  className={`flex flex-col items-center justify-between p-1  mr-2 rounded-full sm:flex-row sm:rounded-md sm:p-1 sm:mt-1 sm:mb-1 sm:border-b-2 sm:border-solid sm:border-b-gray-200 cursor-pointer ${
                    eachUser.doc_id === selectedUser.doc_id &&
                    "sm:bg-selectUserBg"
                  }`}
                  onClick={() => handleSelectUser(eachUser)}
                >
                  <div className="flex flex-col items-center justify-center sm:flex-row">
                    <img
                      src={eachUser.profilePic}
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full"
                    />
                    <div className="ml-1">
                      <p
                        className={`${
                          eachUser.doc_id === selectedUser.doc_id
                            ? "sm:text-textLight text-online"
                            : "sm:text-personName text-xsDevice"
                        } font-semibold text-xs sm:text-sm`}
                      >
                        {eachUser.username}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`hidden sm:block text-xs font-semibold mr-1 text-lastSeen  ${
                      eachUser.isOnline
                        ? "animate-pulse text-onlineDot"
                        : "text-offlineDot"
                    }`}
                  >
                    <GoDotFill className="text-sm sm:text-base" />
                  </p>
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
