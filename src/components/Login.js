import React, { useRef, useState } from "react";
import Header from "./Header";
import { FormValidation } from "../utils/FormValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BACKGROUND_IMG, USER_PROFILE } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const buttonClickHandler = () => {
    const message = FormValidation(
      email?.current?.value,
      password?.current?.value
    );
    setErrMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName?.current?.value,
            photoURL: USER_PROFILE,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute h-screen object-cover md:w-full"
          src={NETFLIX_BACKGROUND_IMG}
          alt="netflix-bg"
        ></img>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute bg-black p-10 md:p-14 w-10/12 md:w-4/12 left-0 right-0 my-40 mx-auto text-white rounded-lg opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={fullName}
              type="text"
              placeholder="Full Name"
              className="p-3 my-4 w-full bg-black border-2 rounded-md"
            ></input>
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email address"
            className="p-3 my-4 w-full bg-black border-2 rounded-md required"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-4 w-full bg-black border-2 rounded-md"
          ></input>
          <h3 className="text-red-700 font-bold">{errMessage}</h3>
          <button
            onClick={buttonClickHandler}
            className="p-3 my-6 w-full bg-red-700 rounded-md z-30 opacity-100"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <h3
            onClick={toggleForm}
            className="text-sm text-gray-400"
          >
            {isSignInForm

              ? <p>New to netflix ? <span className="text-white cursor-pointer">Sign Up Now</span></p>
              : <p>Already registered ? <span className="text-white cursor-pointer">Sign In Now</span></p>}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
