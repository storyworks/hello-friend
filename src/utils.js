import { questions } from "./questions";

export const position = (front, index) => {
  return Math.abs(index - front + 1);
};

export const to = (i, position) => ({
  x: 0,
  y: position < 5 ? position * 15 : 0,
  scale: 1 - position * 0.03,
  rot: 0,
  delay: i * 100
});

export const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

export const trans = (r, s) =>
  `rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export const shuffle = () => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
};
