import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateForm from "../components/CreateForm";
import Image from "../components/Image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const Feed = () => {
  const [user, loading, error] = useAuthState(auth);
  const [imagesList, setImagesList] = useState(null);
  const postsRef = collection(db, "posts");

  const getImages = async () => {
    const data = await getDocs(postsRef);
    const docs = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setImagesList(docs);
  };

  useEffect(() => {
    getImages();
  }, []);

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
            <section className="photoFeed">
              <h1>Images</h1>
              {imagesList?.map((image, key) => {
                return <Image image={image} key={key} />;
              })}
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
