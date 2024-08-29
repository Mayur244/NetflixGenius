import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { languageConstants, NETFLIX_LOGO } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const languageChangeHandler = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  const searchHandler = () => {
    dispatch(toggleGptSearch());
  };

  return (
    <div className="absolute w-full px-7 py-2 bg-gradient-to-b from-black z-50 flex flex-col md:flex-row justify-between">  
      <img className="w-40 mx-auto md:mx-0" src={NETFLIX_LOGO} alt="netflix-logo"></img>
      {user && (
        <div className="p-1 md:p-3 flex justify-between">
          {showGptSearch && <select onChange={languageChangeHandler} className=" px-2 py-4 bg-gray-700 text-white rounded-lg mr-2 cursor-pointer">
          {languageConstants.map((lang) => <option className="text-sm" key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button
            onClick={searchHandler}
            className="py-4 px-4 bg-purple-700 hover:bg-purple-600 mr-4 md:mr-8 text-white font-bold rounded-lg"
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="hidden md:inline-block w-12 h-12 mr-1 md:mr-2 rounded-full cursor-pointer"
            src={user.photoURL}
            alt="user-icon"
          ></img>
          <button
            onClick={signOutHandler}
            className="text-white text-sm font-bold bg-red-700 hover:bg-red-600 md:py-2 px-4 rounded-md z-50 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
