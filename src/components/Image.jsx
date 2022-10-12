import React from "react";

const Image = ({ image }) => {
  return (
    <div>
      <img src={image.imageURL} alt="" height="100" width="100" />
    </div>
  );
};

export default Image;
