import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaMapSigns, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { db, auth } from "../config/firebase";

const Image = ({ image }) => {
  const likesRef = collection(db, "likes");
  const [user, loading, error] = useAuthState(auth);
  const [likesData, setLikesData] = useState([]);

  const likesDoc = query(likesRef, where("imageId", "==", image.id));

  const likeImage = async () => {
    const tempLike = {
      likeId: user?.uid,
      imageId: image.id,
    };
    await addDoc(likesRef, tempLike);
    setLikesData([...likesData, tempLike]);
  };

  const unlikeImage = async () => {
    const delQuery = query(
      likesRef,
      where("imageId", "==", image.id),
      where("likeId", "==", user?.uid)
    );
    const likeToDeleteData = await getDocs(delQuery);
    await deleteDoc(doc(db, "likes", likeToDeleteData.docs[0].id));
    setLikesData(
      likesData.filter(
        (like) => like.likeId != user.uid && like.imageId != image.id
      )
    );
  };

  const getLikes = async () => {
    const tempData = await getDocs(likesDoc);
    const likeData = tempData?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLikesData(likeData);
  };

  const alreadyLiked = likesData.find((l) => l.likeId == user.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="card-container">
      <img
        src={image.imageURL}
        alt={image.location}
        className="location-image"
      />
      <div>
        <FaMapSigns />
        <p>{image.location}</p>
      </div>
      <p>{image.description}</p>
      <p>{image.createdAt}</p>
      <p>@{image.username}</p>
      <button onClick={alreadyLiked ? unlikeImage : likeImage}>
        {alreadyLiked ? (
          <div>
            <FaThumbsDown />
            <p>Unlike</p>
          </div>
        ) : (
          <div>
            <FaThumbsUp />
            <p>Like</p>
          </div>
        )}
      </button>
      <p>Likes: {likesData.length}</p>
    </div>
  );
};

export default Image;
