import React from "react";
import { Input, Progress } from "semantic-ui-react";

const paragraphs = [
  "The word “Retro” comes from Latin word retro, meaning backward or past times. Retro style fonts are outdated or aged style fonts that imply a vintage of at least 15 or 20 years. Texts in retro style can take you or your audience to the good old memories."
];

class Race extends React.Component {
  state = { text: "", userInput: "" };

  componentDidMount = () => {
    let randomParagraph =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];
    this.setState({ text: randomParagraph });
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <h2>Better go fast...</h2>
        <Progress id="progress-bar" percent="11" />
        <p className="race-text">{this.state.text}</p>
        <div className="typearea">
          <label>Type here</label>
          <Input>
            <input
              value={this.state.userInput}
              id="input-field"
              type="text"
              onChange={this.handleChange}
            />
          </Input>
        </div>
      </div>
    );
  }
}

export default Race;
