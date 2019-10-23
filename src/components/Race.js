import React from "react";
import { Input, Progress } from "semantic-ui-react";

const paragraphs = [
  'The word "Retro" comes from Latin word retro, meaning backward or past times. Retro style fonts are outdated or aged style fonts that imply a vintage of at least 15 or 20 years. Texts in retro style can take you or your audience to the good old memories.'
];

// Used for indexing elements used in comparisons

class Race extends React.Component {
  constructor() {
    super();
    this.state = { text: "", userInput: "", greenChars: "", redChar: "" };
    this.globalCounter = 0;
  }

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
    let inputLastChar = userInput[this.globalCounter];
    let textFirstChar = text[0];
    let newText = "";

    const approveChar = () => {
      greenChars += inputLastChar;
      this.globalCounter++;
      newText = text.substring(1);
      this.setState({
        greenChars,
        text: newText,
        redChar: ""
      });
    };

    const backtrack = () => {
      this.globalCounter--;
      this.setState({
        greenChars: greenChars.substring(0, greenChars.length - 1),
        text: greenChars.charAt(greenChars.length - 1) + text,
        redChar: ""
      });
    };

    if (inputLastChar === textFirstChar) {
      //Entered correct character
      approveChar();
    } else {
      //Entered incorrect character
      if (
        userInput[this.globalCounter - 2] ===
          greenChars[this.globalCounter - 2] &&
        userInput.length < greenChars.length
      ) {
        // User starts backspacing
        backtrack();
      } else {
        // Highlight the incorrect character to the user
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
