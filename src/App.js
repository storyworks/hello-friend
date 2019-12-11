import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { questions } from "./questions";

import "./App.css";

/**
 * TODO:
 * Flip to reveal
 * Info credit
 * Create tutorial card
 * Make pretty
 */

const to = (i, position) => ({
  x: 0,
  y: position * -10,
  scale: 1,
  rot: 0,
  delay: i
});
const from = () => ({ x: 0, rot: 0, scale: 1, y: 0 });
const trans = (r, s) => `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

// const shuffle = () => {
//   for (let i = questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [questions[i], questions[j]] = [questions[j], questions[i]];
//   }
// };

const App = () => {
  // Only use this if flipping cards
  // useEffect(() => {
  //   shuffle();
  // }, []);

  const [front, setFront] = useState(questions.length - 1);
  const [backOfDeck, setBack] = useState(questions.length - 5);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [cardProps, setCardProps] = useSprings(questions.length, i => ({
    ...to(i, i - questions.length + 1),
    from: from(0)
  }));
  const [flick, setFlick] = useState(0);

  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx],
      distance,
      direction: [xDir],
      velocity
    }) => {
      const trigger = distance > 125 || velocity > 0.2; // If you flick hard or far enough it should trigger the card to fly out

      setFlick(flick + xDir); // Direction should be sum of direction at each drag moment
      const dir = flick < 0 ? -1 : 1; // Direction should either point left or right

      if (!down && trigger) {
        gone.add(index); // If button/finger's up and trigger is reached, we flag the card ready to fly out
        setFront(front - 1);
        setBack(backOfDeck - 1);
      }

      setCardProps(i => {
        if (i < backOfDeck || i > front) return; // We're only interested in changing spring-data for the current shown springs

        // Rest of cards in deck
        if (index !== i) {
          return { to: to(i, i - front, 0) }; // shift shown springs up
        }

        // Current card
        if (index === i) {
          const isGone = gone.has(index);
          const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
          const rot = mx / 10 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
          const scale = down ? 1.1 : 1; // Active cards lift up a bit
          if (isGone) {
            setFlick(0);
          }
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
          };
        }
      });
    }
  );

  return (
    <>
      {/* <p className="wordmark">hello friend</p> */}
      <div className={"stack"}>
        {cardProps.map(({ x, y, rot, scale }, i) =>
          i <= front + 1 && i > backOfDeck ? (
            <animated.div key={i} className={"cardWrapper"} style={{ x, y }}>
              <animated.div
                {...bind(i)}
                className={"card"}
                style={{
                  transform: interpolate([rot, scale], trans)
                }}
              >
                {/* <p>{`#${cards[i].id.slice(4)}`}</p> */}
                <br />
                {questions[i].message}
              </animated.div>
            </animated.div>
          ) : null
        )}
      </div>
      <button
        onClick={() =>
          setTimeout(
            () =>
              gone.clear() ||
              setFront(questions.length - 1) ||
              setBack(questions.length - 5) ||
              setCardProps(i => to(i, i - questions.length + 1)),
            0
          )
        }
      >
        <span>Reset</span>
      </button>
    </>
  );
};

export default App;
