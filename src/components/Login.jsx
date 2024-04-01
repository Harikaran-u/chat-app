import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosChatboxes } from "react-icons/io";
import { auth, provider, db } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  query,
  where,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const defaultProfilePic =
  "https://res.cloudinary.com/diuvnny8c/image/upload/v1708271782/User-Profile-PNG-Image_eyvnnm.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (userId) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSubmitUser = (e) => {
    e.preventDefault();
    loginUser();
    setUsername("");
  };

  const loginUser = async (
    loginUserName = username,
    profileUrl = defaultProfilePic
  ) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const userDoc = {
        username: loginUserName,
        profilePic: profileUrl,
        isOnline: true,
        loginTime: new Date(),
      };
      try {
        const userData = await addDoc(usersRef, userDoc);
        Cookies.set("userId", userData.id, { expires: 7 });
        navigate("/", { replace: true });
        console.log("New user created successfully!");
      } catch (error) {
        console.error("Error creating new user:", error);
      }
    } else {
      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = { id: doc.id, ...doc.data() };
      });
      try {
        const docRef = doc(db, "users", userData.id);
        await updateDoc(docRef, {
          isOnline: true,
          loginTime: new Date(),
        });
      } catch (error) {
        console.log(error);
      }

      Cookies.set("userId", userData.id, { expires: 7 });
      navigate("/", { replace: true });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const displayName = result.user.displayName;
      const profileUrl = result.user.photoURL;
      loginUser(displayName, profileUrl);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen app-bg">
      <div className="shadow-2xl p-4 md:p-8 rounded-md backdrop-blur-sm w-64 md:w-3/5 lg:w-2/5 bg-loginBg">
        <h1 className="flex items-center justify-center text-md md:text-2xl font-bold text-title mb-2">
          Chat Hub <IoIosChatboxes className="ml-2" />
        </h1>
        <form className="flex flex-col" onSubmit={onSubmitUser}>
          <label
            htmlFor="user-name"
            className="text-xs md:text-sm font-bold text-label"
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="outline-none rounded-md p-1 mt-1 border-black focus:border-blue-600 border-2 border-solid bg-transparent"
            id="user-name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-btnBg rounded-md p-2 mt-4 text-sm font-bold text-white disabled:bg-opacity-50 disabled:cursor-not-allowed border-black border-2 border-solid"
            disabled={username !== "" ? false : true}
          >
            Login
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 mt-4 text-sm font-bold border-2 border-black border-solid bg-googleBg text-btnWhite"
            onClick={handleSignInWithGoogle}
          >
            Login with{" "}
            <FcGoogle className="ml-2 bg-whiteBg rounded p-1" size="25" />
          </button>
        </form>
        {isError && <p>Something went wrong!!!</p>}
      </div>
    </div>
  );
};

export default Login;
