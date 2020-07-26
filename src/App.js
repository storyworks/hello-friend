import React, { useState } from "react";
import { shuffle } from "./utils";
import { questions, instructions } from "./questions";
import Deck from "./Deck/Deck";
// import Themes from "./Themes/Themes";
import palettes from "./Themes/palettes";

import "./App.css";

/**
 * TODO:
 * Info credit
 * Fix splash page
 */

const resetButton = (theme) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="50pt"
    height="50pt"
    viewBox="0 0 200 200"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0,200) scale(0.1,-0.1)"
      fill={theme.colorOnDark}
      stroke="none"
    >
      <path
        d="M933 1750 c-83 -12 -220 -60 -289 -101 -30 -19 -84 -58 -120 -87
              l-64 -54 0 92 c0 83 -2 93 -25 115 -21 21 -33 25 -88 25 -50 0 -70 -5 -91 -21
              l-26 -20 0 -290 c0 -276 1 -290 20 -309 19 -19 33 -20 310 -20 346 0 330 -6
              330 113 0 102 -10 110 -143 117 l-101 5 49 42 c220 188 530 175 735 -30 294
              -294 156 -784 -255 -902 -99 -29 -141 -96 -113 -181 17 -50 66 -84 123 -84 52
              0 163 37 254 85 133 70 256 199 326 340 60 123 76 188 82 340 4 110 2 143 -15
              211 -77 305 -306 532 -602 598 -86 20 -220 27 -297 16z"
      />
    </g>
  </svg>
);

const App = () => {
  const [shuffledQuestions] = useState([...shuffle(questions), instructions]);
  const [reset, setReset] = useState(false);
  const [theme] = useState(palettes[0]);

  return (
    <div className={"app"} style={theme}>
      <div className="header">
        <div className="wordmark" style={{ color: theme.colorOnDark }}>
          hello friend.
        </div>
        {/* <Themes theme={theme} setTheme={setTheme} /> */}
      </div>
      <div className={"content"}>
        <button
          onClick={() => {
            setReset(true);
          }}
          aria-label="Reset cards"
        >
          {resetButton(theme)}
        </button>
        <Deck
          questions={shuffledQuestions}
          reset={reset}
          setReset={setReset}
          theme={theme}
        />
      </div>
      <div className={"credits"} style={{ color: theme.colorOnDark }}>
        made by ziwei
      </div>
    </div>
  );
};

export default App;
