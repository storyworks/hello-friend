import React, { Component } from "react";
import Swing from "react-swing";
import logo from "./logo.svg";
import { questions } from "./questions";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <img src={logo} className="logo" alt="logo" />
        <div id="viewport">
          <Swing
            className="stack"
            tagName="div"
            setStack={stack => this.setState({ stack: stack })}
            ref="stack"
            throwout={e => console.log("throwout", e)}
          >
            {questions.map(question => (
              <div
                className="card"
                ref={question.id}
                throwout={e => console.log("card throwout", e)}
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
