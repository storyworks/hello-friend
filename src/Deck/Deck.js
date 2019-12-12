import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { to, from, trans, position } from "../utils";

import "../App.css";

const Deck = props => {
  const [questions, reset, setReset] = [
    props.questions,
    props.reset,
    props.setReset
  ];

  const initialFront = questions.length - 1;
  const initialBack = questions.length - 6;

  const [front, setFront] = useState(initialFront);
  const [back, setBack] = useState(initialBack);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [cardProps, setCardProps] = useSprings(questions.length, i => ({
    ...to(i, position(i, front - 1)),
    from: from()
  }));
  const [flick, setFlick] = useState(0);

  if (reset) {
    setTimeout(
      () =>
        gone.clear() ||
        setFront(initialFront) ||
        setBack(initialBack) ||
        setCardProps(i => to(i, position(i, front - 1))) ||
        setReset(false) ||
        0
    );
  }

  const bind = useDrag(
    ({
      args: [currentCard],
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
        gone.add(currentCard); // If button/finger's up and trigger is reached, we flag the card ready to fly out
        setFront(front - 1);
        setBack(back - 1);
      }

      setCardProps(i => {
        if (i < back || i > front) return; // We're only interested in changing spring-data for the current shown springs

        if (!down && trigger) {
          // Rest of cards in deck - shift them up deck
          if (i !== currentCard) {
            return {
              to: to(i, position(front, i))
            };
          }
        }

        // Current card
        if (i === currentCard) {
          const isGone = gone.has(currentCard);
          const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
          const rot = mx / 10 + (isGone ? dir * 15 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
          const scale = down ? 1.1 : 1; // Active cards lift up a bit
          if (isGone) {
            setFlick(0);
          }
          return {
            x,
            rot,
            scale,
            delay: undefined,
            config: { friction: 75, tension: down ? 800 : isGone ? 200 : 500 }
          };
        }
      });
    }
  );

  return (
    <div className={"stack"}>
      {cardProps.map(({ x, y, rot, scale }, i) =>
        i <= front + 1 && i > back ? (
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
  );
};

export default Deck;
