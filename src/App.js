import React, { Component } from "react";
import Swing from "react-swing";
import logo from "./logo.svg";
import { questions } from "./questions";
import "./App.css";

const Direction = {
  DOWN: Symbol("DOWN"),
  LEFT: Symbol("LEFT"),
  RIGHT: Symbol("RIGHT"),
  UP: Symbol("UP")
};

const config = {
  // allowedDirections: [Direction.DOWN, Direction.LEFT, Direction.RIGHT],
  throwOutConfidence: (xOffset, yOffset, element) => {
    // const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
    // const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

    // return Math.max(xConfidence, yConfidence);
    return 1;
  }

  //rotation: 50
};

class App extends Component {
  render() {
    return (
      <>
        <img src={logo} className="logo" alt="logo" />
        <div id="viewport">
          <Swing
            className="stack"
            // tagName="div"
            setStack={stack => this.setState({ stack: stack })}
            config={config}
            ref="stack"
            throwout={e => console.log("throwout stack", e)}
          >
            {questions.map(question => (
              <div
                className="card"
                ref={question.id}
                key={question.id}
                throwout={e => console.log(e)}
              >
                {question.message}
              </div>
            ))}
          </Swing>
        </div>
      </>
    );
  }
}

export default App;
