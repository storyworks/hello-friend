import { animated } from "react-spring";
import styled from "styled-components";

const Container = styled(animated.div)`
  display: flex;
  padding: 8px;
  margin: 8px;
  min-height: 42px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: width, height;
`;

const Item = styled(animated.div)`
  display: flex;
  width: 100%;
  height: 100%;
  background: white;
  margin-right: 8px;
  border-radius: 5px;
  will-change: transform, opacity;
`;

const CurrentTheme = styled(animated.div)`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.05);
  will-change: transform, opacity;
`;

export { Container, Item, CurrentTheme };
