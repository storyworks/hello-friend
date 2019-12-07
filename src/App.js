import React, { Component } from "react";
import { Deck } from "./Deck";
import logo from "./logo.svg";

import "./App.css";

/**
 * TODO:
 * Reset button
 * Flip to reveal
 * Info credit
 * Shuffle
 * Create cards in correct order
 */

class App extends Component {
  render() {
    return (
      <>
        <img src={logo} className="logo" alt="logo" />
        <Deck />
        {/* Add button here? */}
      </>
    );
  }
}

export default App;
