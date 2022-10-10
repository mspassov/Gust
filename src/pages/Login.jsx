import React from "react";
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
    <div>
      <h3>Sign-in With Google</h3>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};

export default Login;
