import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { updateDoc, doc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const UpdateUser = () => {
  const [imgFileName, setImgFileName] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [isError, setError] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, []);

  const handleImgInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFileName(file.name);
      setImgFile(file);
    }
  };

  const updateUserData = async () => {
    if (updatedUsername) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          username: updatedUsername,
        });
        setIsUpdateSuccess(true);
        setLoader(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    }
  };

  const uploadUserProfile = async () => {
    if (imgFile) {
      try {
        const imgRef = ref(storage, imgFileName);
        await uploadBytes(imgRef, imgFile);
        const downloadableUrl = await getDownloadURL(imgRef);

        await updateDoc(doc(db, "users", userId), {
          profilePic: downloadableUrl,
        });
        setIsUpdateSuccess(true);
        setLoader(false);
      } catch (error) {
        setError(true);
      }
    }
  };

  const handleUserData = (e) => {
    setLoader(true);
    e.preventDefault();
    uploadUserProfile();
    updateUserData();
    setImgFile("");
    setImgFileName("");
    setUpdatedUsername("");
  };

  return (
    <div className="app-bg h-screen flex justify-center items-center">
      {isUpdateSuccess && (
        <div className="flex flex-col items-center justify-center shadow-2xl p-4 md:p-8 rounded-md backdrop-blur-sm w-64 md:w-3/5 lg:w-2/5 bg-loginBg">
          <h1 className="text-lg text-label font-bold">
            Successfully uploaded
          </h1>
          <Link to="/">
            <button className="bg-btnBg text-label text-sm p-1 rounded">
              Go to Home
            </button>
          </Link>
        </div>
      )}
      {!isUpdateSuccess && !isLoading && (
        <form
          className="shadow-2xl p-4 md:p-8 rounded-md backdrop-blur-sm w-64 md:w-3/5 lg:w-2/5 bg-loginBg"
          onSubmit={handleUserData}
        >
          <input
            type="text"
            placeholder="update username..."
            className="w-full rounded border-0 p-1 outline-cyan-400"
            onChange={(e) => setUpdatedUsername(e.target.value)}
            value={updatedUsername}
          />

          <div className="flex flex-col">
            <input
              type="file"
              id="image-file-input"
              onChange={handleImgInput}
              accept="image/*"
              className="hidden"
            />
            {imgFileName && (
              <span className="text-sm mt-2 font-semibold">{imgFileName}</span>
            )}
            <label
              htmlFor="image-file-input"
              className="bg-btnBg p-1 rounded text-xs sm:text-sm font-semibold text-center mt-2 w-full cursor-pointer"
            >
              Upload Profile Picture
            </label>

            <button
              type="submit"
              className="bg-btnBg p-1 mt-2 rounded text-xs sm:text-sm font-semibold"
            >
              update
            </button>
          </div>
          {isError && (
            <span className="text-xs font-semibold text-offline">
              Something went wrong!!!
            </span>
          )}
        </form>
      )}
      {isLoading && (
        <div className="flex flex-col items-center justify-center shadow-2xl p-4 md:p-8 rounded-md backdrop-blur-sm w-64 md:w-3/5 lg:w-2/5 bg-loginBg">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
