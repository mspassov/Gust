import React from "react";
import Navbar from "../components/Navbar";
import CreateForm from "../components/CreateForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const Feed = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <React.Fragment>
      <Navbar />
      <div>
        {user ? (
          <div>
            <p>{user.displayName}</p>
            <img
              src={
                user?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZTgJiqRWL5wWednBz8zyRUhSuEDTzefieg&usqp=CAU"
              }
              width="100"
              height="100"
            />
            <section className="createPostSection">
              <CreateForm />
            </section>
          </div>
        ) : (
          <h1>You are not logged in!</h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default Feed;
