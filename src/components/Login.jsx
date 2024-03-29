import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosChatboxes } from "react-icons/io";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isError, setIsError] = useState(false);
  const onSubmitUser = (e) => {
    e.preventDefault();
    setUsername("");
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen app-bg">
      <div className="shadow-2xl p-5 rounded-md backdrop-blur-sm w-64 sm:w-3/5 md:w-2/5 border-2 border-black bg-loginBg">
        <h1 className="flex items-center justify-center text-md sm:text-2xl font-bold text-title mb-2">
          Chat Hub <IoIosChatboxes className="ml-2" />
        </h1>
        <form className="flex flex-col" onSubmit={onSubmitUser}>
          <label
            htmlFor="user-name"
            className="text-xs sm:text-sm font-bold text-label"
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
