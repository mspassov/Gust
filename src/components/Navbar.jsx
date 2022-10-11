import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav>
      <h1>Gust App</h1>
      {user ? (
        <Link to="/">
          <button onClick={logout}>Logout</button>
        </Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
