import React from "react";
import { FaMapSigns } from "react-icons/fa";

const Image = ({ image }) => {
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
    </div>
  );
};

export default Image;
