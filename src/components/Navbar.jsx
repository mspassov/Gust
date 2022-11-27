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
          <h1>
            <Link to="/">Gust Social</Link>
          </h1>
        </div>
        {user ? (
          <div className="user-container">
            <img
              src={
                user?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU"
              }
              width="100"
              height="100"
            />
            <h5>{user.displayName}</h5>
            <Link to="/">
              <div className="logout">
                <button onClick={logout}>Logout</button>
              </div>
            </Link>
          </div>
        ) : (
          <div className="link-container">
            <div className="login">
              <Link to="/login">Login</Link>
            </div>
            <div className="register">
              <Link to="/login">Register</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
