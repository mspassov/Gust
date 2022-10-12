import React, { useState, useRef } from "react";
import { auth } from "../config/firebase";
import { storage, app } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { upload } from "@testing-library/user-event/dist/upload";

const CreateForm = () => {
  const [user, loading, error] = useAuthState(auth);
  const [fileURL, setfileURL] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const tempDate = new Date();
  const imageRef = useRef();

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `images/${file?.name + v4()}`);

    const res = await uploadBytes(imageRef, file);
    const fileUrl = await getDownloadURL(imageRef);
    setfileURL(fileUrl);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const postsRef = collection(db, "posts");

    const tempPost = {
      username: user?.displayName,
      id: user?.uid,
      location: location,
      description: description,
      createdAt: tempDate.toLocaleString(),
      imageURL: fileURL,
    };

    await addDoc(postsRef, tempPost);
    setfileURL("");
    setLocation("");
    setDescription("");
    imageRef.current.value = "";
  };

  return (
    <React.Fragment>
      <h1>Create a New Post</h1>
      <form onSubmit={submitPost}>
        <input type="file" onChange={uploadFile} ref={imageRef} />
        <input
          type="text"
          placeholder="Location..."
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />
        <br />
        <textarea
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <br />
        <button>Create</button>
      </form>
    </React.Fragment>
  );
};

export default CreateForm;
