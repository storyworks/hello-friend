import React, { useState, useEffect } from "react";
import { shuffle } from "./utils";
import { questions } from "./questions";
import Deck from "./Deck/Deck";

import "./App.css";

/**
 * TODO:
 * Flip to reveal
 * Info credit
 * Add card numbers
 * Fix splash page
 * Update reset button
 */

const App = () => {
  useEffect(() => {
    shuffle();
  }, []);

  const [reset, setReset] = useState(false);

  return (
    <>
      {/* <p className="wordmark">hello friend</p> */}
      <Deck questions={questions} reset={reset} setReset={setReset} />
      <button
        onClick={() => {
          setReset(true);
        }}
      >
        <span>Reset</span>
      </button>
    </>
  );
};

export default App;
