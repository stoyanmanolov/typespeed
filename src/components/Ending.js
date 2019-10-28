import React from "react";
import { useHistory } from "react-router-dom";
import { Progress } from "semantic-ui-react";
import Fireworks from "../images/fireworks.gif";

const Ending = props => {
  let history = useHistory();
  let { charactersCount, seconds } = props.location.state;

  const calculateWPM = (charactersCount, seconds) => {
    let words = charactersCount / 5;
    return parseInt(words * (60 / seconds), 10);
  };

  const handleClick = event => {
    history.push("/race");
  };

  return (
    <div className="ending-container container">
      <h2>Congratulations you made it</h2>
      <Progress id="progress-bar" percent="100" progress success />
      <p className="wpm-score">
        Your WPM: {calculateWPM(charactersCount, seconds)}
      </p>
      <img src={Fireworks} className="fireworks" alt="fireworks" />
      <button className="try-again-button" onClick={handleClick}>
        Try Again
      </button>
    </div>
  );
};

export default Ending;
