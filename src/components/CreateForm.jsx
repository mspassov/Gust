import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { auth } from "../config/firebase";
import { storage, app } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { upload } from "@testing-library/user-event/dist/upload";

const CreateForm = () => {
  const [user, loading, error] = useAuthState(auth);
  const [fileURL, setfileURL] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [chooseFile, setChooseFile] = useState("Upload a Photo");
  const navigate = useNavigate();
  const tempDate = new Date();
  const imageRef = useRef();

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    setChooseFile(file.name);
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
      userId: user?.uid,
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

    window.location.reload(false);
  };

  return (
    <div className="create-form-container">
      <h1>Where have you been?</h1>
      <form onSubmit={submitPost}>
        <input
          type="file"
          onChange={uploadFile}
          ref={imageRef}
          id="file"
          accept="image/*"
        />
        <label htmlFor="file" className="file-button">
          <FaCamera
            style={{ height: "20px", width: "20px", color: "white" }}
          />
          <div>{chooseFile}</div>
        </label>
        <input
          type="text"
          placeholder="Location..."
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          maxLength="30"
        />
        <textarea
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength="200"
        ></textarea>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateForm;
