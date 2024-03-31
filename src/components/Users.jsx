import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import Cookies from "js-cookie";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Users = () => {
  const [userSearch, setUserSearch] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ doc_id: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useSelector((state) => state.chats.isDark);

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

  const handleUserSearch = (e) => {
    const value = e.target.value;
    setUserSearch(value);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const filteredUsersList = usersList.filter((eachUser) =>
    eachUser.username.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div
      className={`${
        isDark ? "bg-DarkBg" : "bg-whiteBg"
      } p-3 rounded-lg mt-2 h-full`}
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
      <p className="text-base font-semibold text-category mb-2">Users</p>
      {!isLoading && (
        <ul
          className={`${
            isDark ? "bg-DarkBg" : "bg-whiteBg"
          } h-56 overflow-y-auto user-scroll p-1 rounded`}
        >
          {filteredUsersList !== null &&
            filteredUsersList.map((eachUser) => {
              return (
                <li
                  key={eachUser.doc_id}
                  className={`flex items-center justify-between rounded-md p-1 mb-2 border-b-2 border-b-gray-200 cursor-pointer border-solid ${
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
                  {/* <div className="flex items-center">
                <p className="text-xs mr-1 text-lastSeen">
                  {eachUser.lastSeen}
                </p>
                <p className="text-xs text-lastSeen">{eachUser.time}</p>
              </div> */}
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
