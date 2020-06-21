// cardIndex 0 starts from bottom of deck
// position 0 starts from front of deck
export const position = (totalCards, cardIndex, string) => {
  return totalCards - cardIndex;
};

export const to = (position) => ({
  x: 0,
  y: position < 5 ? (position === 0 ? 0 : position * 15) : 0,
  scale: 0.9 - (position + 3) * 0.03,
  rot: [0, 0, 0],
  delay: 1000 - position * 150,
});

export const from = (position) => {
  return position < 5
    ? { x: 0, rot: [0, 0, 0], scale: 1.5, y: -1000 }
    : { x: 0, rot: [0, 0, 0], scale: 0, y: 0 };
};

export const trans = (rot, s) =>
  `scale(${s}) rotateY(${rot[1]}deg) rotateZ(${rot[2]}deg)`;

export const shuffle = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
};
