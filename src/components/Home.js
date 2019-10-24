import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  let history = useHistory();
  const handleClick = event => {
    history.push("/race");
  };

  return (
    <div className="container">
      <h2>Test your typing speed</h2>
      <p>
        This app determines your speed of typing measured in WPM (words per
        minute). <br /> Inspired by <i>typeracer.com</i>
      </p>
      <button className="start-button" onClick={handleClick}>
        START THE RACE
      </button>
    </div>
  );
};

export default Home;
