import React, { Component } from "react";
import { Deck } from "./Deck";
import logo from "./logo.svg";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <img src={logo} className="logo" alt="logo" />
        <Deck />
      </>
    );
  }
}

export default App;
