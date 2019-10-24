import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Progress } from "semantic-ui-react";

const paragraphs = [
  'The word "Retro" comes from Latin word retro, meaning backward or past times. Retro style fonts are outdated or aged style fonts that imply a vintage of at least 15 or 20 years. Texts in retro style can take you or your audience to the good old memories.'
];

class Race extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      initialTextLength: 0,
      userInput: "",
      greenChars: "",
      redChar: ""
    };
    // used for indexing in comparisons
    this.globalCounter = 0;
    // used for timing seconds
    this.seconds = 0;
  }

  componentDidMount = () => {
    let randomParagraph =
      paragraphs[Math.floor(Math.random() * paragraphs.length)];
    this.setState({
      text: randomParagraph,
      initialTextLength: randomParagraph.length
    });

    const time = () => {
      return (this.seconds += 1);
    };

    this.interval = setInterval(time, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
    this.compare(event.target.value, this.state.text);
  };

  compare = (userInput, text) => {
    let { greenChars, redChar } = this.state;
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

  calculatePercentage = () => {
    const { initialTextLength } = this.state;
    if (initialTextLength && this.globalCounter > 0) {
      return parseInt((this.globalCounter / initialTextLength) * 100, 10);
    }
  };

  render() {
    if (this.state.greenChars && this.state.text.length === 0) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: {
              charactersCount: this.state.greenChars.length,
              seconds: this.seconds
            }
          }}
        />
      );
    }
    return (
      <div className="container">
        <h2 className="race-heading">Better go fast...</h2>
        <Progress
          id="progress-bar"
          percent={this.calculatePercentage()}
          indicating
          progress
        />
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
