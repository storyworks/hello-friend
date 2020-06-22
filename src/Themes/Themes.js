import React, { useState, useRef } from "react";
import { useTransition, useSpring, useChain, config } from "react-spring";
import { Container, Item, CurrentTheme } from "./styles";
import palettes from "./palettes";

const Themes = (themeProps) => {
  const [open, set] = useState(false);

  const springRef = useRef();
  const { width, height, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { width: "7vw", height: "7vh", background: "white" },
    to: {
      width: open ? "99vw" : "12vw",
      height: open ? "7vh" : "7vh",
      background: "white",
    },
  });

  const transRef = useRef();
  const transitions = useTransition(open ? palettes : [], (item) => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / palettes.length,
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <Container
      style={{ ...rest, width: width, height: height }}
      onClick={() => set((open) => !open)}
    >
      {transitions.map(({ item, key, props }) => (
        <Item
          key={key}
          style={{ ...props, background: item.background }}
          onClick={() =>
            themeProps.setTheme({
              background: item.background,
              colorOnDark: item.colorOnDark,
              color1: item.color1,
              color2: item.color2,
            })
          }
        />
      ))}
      <CurrentTheme
        style={{
          background: themeProps.theme.background,
        }}
      />
    </Container>
  );
};

export default Themes;
