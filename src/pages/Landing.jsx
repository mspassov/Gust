import React from "react";
import Navbar from "../components/Navbar";
import LandingPicture from "../images/landing-page-picture.jpg"

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="landing-container">
          <img src={LandingPicture} alt="" className="landing-img"/>
          <div className="landing-text">
            <h3>What <span className="adventure">adventure</span> will you share?</h3>
            <p>Gust is the newest social media platform which allows you to show the world all of the cool places you've been to. Start sharing today!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
