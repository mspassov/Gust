import React, { useState } from "react";
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
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const tempDate = new Date();

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, `images/${file.name + v4()}`);

    const res = await uploadBytes(imageRef, file);
    const fileUrl = await getDownloadURL(imageRef);

    console.log(fileUrl);
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
      imageURL: "/img/testImage",
    };

    await addDoc(postsRef, tempPost);
  };

  return (
    <React.Fragment>
      <h1>Create a New Post</h1>
      <form>
        <input type="file" onChange={uploadFile} />
        <input
          type="text"
          placeholder="Location..."
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <br />
        <textarea
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <button onClick={submitPost}>Create</button>
      </form>
    </React.Fragment>
  );
};

export default CreateForm;
