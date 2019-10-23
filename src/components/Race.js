import React from "react";
import { Input, Progress } from "semantic-ui-react";

const paragraphs = [
  'The word "Retro" comes from Latin word retro, meaning backward or past times. Retro style fonts are outdated or aged style fonts that imply a vintage of at least 15 or 20 years. Texts in retro style can take you or your audience to the good old memories.'
];

// Used for indexing elements used in comparisons
let globalCounter = 0;

class Race extends React.Component {
  state = { text: "", userInput: "", greenChars: "", redChar: "" };

  componentDidMount = () => {
    let randomParagraph =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];
    this.setState({ text: randomParagraph });
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
    this.compare(event.target.value, this.state.text);
  };

  compare = (userInput, text) => {
    let greenChars = this.state.greenChars;
    let redChar = this.state.redChar;
    let newText = "";
    let inputLastChar = userInput[globalCounter];
    let textFirstChar = text[0];

    if (inputLastChar === textFirstChar) {
      //If characters match correctly
      greenChars += inputLastChar;
      globalCounter++;
      newText = text.substring(1);
      this.setState({
        greenChars,
        text: newText,
        redChar: ""
      });
    } else {
      if (
        userInput[globalCounter - 2] === greenChars[globalCounter - 2] &&
        userInput.length < greenChars.length
      ) {
        //Backtracking
        globalCounter--;
        this.setState({
          greenChars: greenChars.substring(0, greenChars.length - 1),
          text: greenChars.charAt(greenChars.length - 1) + text,
          redChar: ""
        });
      } else {
        //In case of a mistake
        redChar = textFirstChar;
        this.setState({ redChar: redChar });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Better go fast...</h2>
        <Progress id="progress-bar" percent="11" />
        <p className="race-text">
          <span style={{ color: "green" }}>{this.state.greenChars}</span>
          <span style={{ backgroundColor: "LightCoral" }}>
            {this.state.redChar}
          </span>
          {!this.state.redChar ? this.state.text : this.state.text.substring(1)}
        </p>
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
