import React from "react";
import Navbar from "../components/Navbar";
import gLogo from "../images/G-logo.png";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    if (user) {
      navigate("/feed");
    } else if (error) {
      alert("Could not sign in, please try again!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="sign-in-container">
        <img src={gLogo} alt="" />
        <button onClick={signIn}>Sign In With Google</button>
      </div>
    </>
  );
};

export default Login;
