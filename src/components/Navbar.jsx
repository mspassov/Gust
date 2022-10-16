import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FaWind } from "react-icons/fa";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav>
      <div className="container nav-container">
        <div className="logo-container">
          <FaWind style={{ height: "30px", width: "30px", color: "#CA1551" }} />
          <h1>Gust Social</h1>
        </div>
        {user ? (
          <Link to="/">
            <div className="login">
              <button onClick={logout}>Logout</button>
            </div>
          </Link>
        ) : (
          <div className="link-container">
            <div className="login">
              <Link to="/login">Login</Link>
            </div>
            <div className="register">
              <Link to="/register">Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
