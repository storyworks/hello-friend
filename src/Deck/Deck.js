import React, { useState } from "react";
import { useSprings, animated as a, to as interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { to, from, trans, position } from "../utils";

import "./Deck.css";

const graphic = (color1, color2, isBottom, ratio) => (
  <svg
    viewBox={`0 0 1000 ${330 * ratio}`}
    xmlns="http://www.w3.org/2000/svg"
    className={`graphic ${isBottom ? "rotate" : ""}`}
  >
    <g>
      <path
        transform="rotate(90 333,165)"
        id="svg_4"
        //
        d={`m168,10l0,-168l${330 * ratio},660l-${330 * ratio},0z`}
        fill="#DDD"
      />
      <path
        transform="rotate(-180 666,165)"
        id="svg_2"
        d={`m330,330l 0,-${330 * ratio}l660,${330 * ratio}l-660,0z`}
        fill={color1}
      />
    </g>
  </svg>
);

const Deck = (props) => {
  const [questions, reset, setReset] = [
    props.questions,
    props.reset,
    props.setReset,
  ];

  // First questions are stacked first, so top of deck is end of deck.
  const totalCards = questions.length - 1;
  const initialBottomIndex = totalCards - 6;

  const [availableCards, setAllCards] = useState(totalCards);
  const [bottomCardIndex, setDisplayRange] = useState(initialBottomIndex);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [revealed] = useState(() => new Set());
  const [cardProps, setCardProps] = useSprings(questions.length, (i) => ({
    ...to(position(totalCards, i, "to")),
    from: from(position(totalCards, i, "fr")),
  }));
  const [flick, setFlick] = useState(0);

  if (reset) {
    setTimeout(
      () =>
        gone.clear() ||
        revealed.clear() ||
        setAllCards(totalCards) ||
        setDisplayRange(initialBottomIndex) ||
        // This must use totalCards else it glitches the deck
        setCardProps((cardIndex) => ({
          ...to(position(totalCards, cardIndex, "reset to")),
          from: from(position(totalCards, cardIndex, "reset fr")),
        })) ||
        setReset(false) ||
        0
    );
  }

  const triggerEvents = (down, tap, currentCard, trigger) => {
    if (!down && trigger) {
      gone.add(currentCard); // If button/finger's up and trigger is reached, we flag the card ready to fly out
      setAllCards(availableCards - 1);
      setDisplayRange(bottomCardIndex - 1);
    }

    if (tap && !gone.has(currentCard)) {
      revealed.add(currentCard);
      console.log(revealed);
    }
  };

  const bind = useDrag(
    ({
      args: [currentCard],
      down,
      movement: [mx],
      distance,
      direction: [xDir],
      velocity,
      tap,
    }) => {
      setCardProps((cardIndex) => {
        // We're only interested in changing spring-data for the current shown springs
        // back - 1 so you position the next invisible element ready for display
        if (cardIndex < bottomCardIndex - 1 || cardIndex > availableCards)
          return;

        const trigger = distance > 125 || velocity > 0.2; // If you flick hard or far enough it should trigger the card to fly out

        if (!down && trigger) {
          // Rest of shown cards in deck - shift them up deck
          if (cardIndex !== currentCard) {
            const setNextCard = cardIndex + 1;
            return {
              to: to(position(availableCards, setNextCard, "drag")),
            };
          }
        }

        setFlick(flick + xDir); // Direction should be sum of direction at each drag moment
        const dir = flick < 0 ? -1 : 1; // Direction should either point left or right

        triggerEvents(down, tap, currentCard, trigger);

        // Current card set props to make it fly out or follow mouse
        if (cardIndex === currentCard) {
          const isGone = gone.has(currentCard);
          const isRevealed = revealed.has(currentCard);
          // When a card is gone it flys out left or right, otherwise goes back to zero
          const x = isGone ? (100 + window.innerWidth) * dir : down ? mx : 0;

          // How much the card tilts, flicking it harder makes it rotate faster
          const tilt = mx / 10 + (isGone ? dir * 15 * velocity : 0);
          const modifyTilt = isRevealed ? tilt * -1 : tilt;

          const rotX = 0;
          const rotY = isRevealed ? 180 : 0;
          const rotZ =
            modifyTilt < 0
              ? Math.max(modifyTilt, -64)
              : Math.min(modifyTilt, 64);
          const rot = [rotX, rotY, rotZ];
          const scale = isRevealed ? 1 : 0.95;

          if (isGone) {
            setFlick(0);
          }

          return {
            x,
            rot,
            scale,
            delay: 0,
            config: {
              friction: isRevealed ? (isGone ? 75 : 75) : 75,
              tension: down ? 800 : isGone ? 200 : 500,
            },
            filterTaps: true,
          };
        }
      });
    }
  );

  const ratio = (window.innerHeight * 0.7) / window.innerWidth;

  return (
    <div className={"stack"}>
      {cardProps.map(({ x, y, rot, scale }, i) => {
        return i <= availableCards + 1 && i > bottomCardIndex ? (
          <a.div key={i} className={"cardWrapper"} style={{ x, y }}>
            <a.div
              {...bind(i)}
              className={"card"}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
            >
              <div className={"card-back"}>
                {graphic(props.theme.color1, props.theme.color2, false, ratio)}
                {questions[i].id === 0 ? (
                  <div className={"instructions"}>{questions[i].part1}</div>
                ) : (
                  <div
                    className={"mark"}
                    style={{
                      fontSize: `${
                        (4.6 * window.innerHeight) / window.innerWidth
                      }em`,
                      color: "#ddd",
                    }}
                  >
                    ?
                  </div>
                )}
                {graphic(props.theme.color1, props.theme.color2, true, ratio)}
              </div>
              <div className={"card-front"}>
                <div className={"cardId topId"}>{`#${questions[i].id}`}</div>
                <div className={"cardQuestions"}>{questions[i].message}</div>
                <div className={"cardId bottomId"}>{`#${questions[i].id}`}</div>
              </div>
            </a.div>
          </a.div>
        ) : null;
      })}
    </div>
  );
};

export default Deck;
