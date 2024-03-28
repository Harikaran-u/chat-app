import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const onSubmitUser = (e) => {
    e.preventDefault();
    setUsername("");
  };
  return (
    <div className="bg-loginBg shadow-xl w-2/5 p-2 rounded-md">
      <h1 className="text-2xl font-bold text-title text-center">Chat Hub</h1>
      <form className="flex flex-col" onSubmit={onSubmitUser}>
        <label htmlFor="user-name" className="text-sm font-bold text-label">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="outline-none rounded-md p-1 mt-1 border-black border-2 bg-transparent"
          id="user-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-btnBg rounded-sm p-2 mt-4 text-sm font-bold text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
          disabled={username !== "" ? false : true}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
