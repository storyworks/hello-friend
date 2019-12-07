import React, { Component } from "react";
import Swing from "react-swing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div id="viewport">
        <Swing
          className="stack"
          tagName="div"
          setStack={stack => this.setState({ stack: stack })}
          ref="stack"
          throwout={e => console.log("throwout", e)}
        >
          <div
            className="card clubs"
            ref="card1"
            throwout={e => console.log("card throwout", e)}
          >
            ♣
          </div>
          <div className="card diamonds" ref="card2">
            ♦
          </div>
          <div className="card hearts" ref="card3">
            ♥
          </div>
          <div className="card spades" ref="card4">
            ♠
          </div>
        </Swing>
      </div>
    );
  }
}

export default App;
