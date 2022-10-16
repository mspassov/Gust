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
          <>
            <div className="container">
              <section>
                <CreateForm />
              </section>
              <div className="feed-container">
                {imagesList?.map((image, key) => {
                  return <Image image={image} key={key} />;
                })}
              </div>
            </div>
            <footer>
              <p>MVS Technologies 2020</p>
            </footer>
          </>
        ) : (
          <h1>You are not logged in!</h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default Feed;
