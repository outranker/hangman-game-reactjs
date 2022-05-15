const layout = {
  default: [
    "1 2 3 4 5 6 7 8 9 0",
    "q w e r t y u i o p",
    " a s d f g h j k l ",
    "{lock} z x c v b n m {bksp}",
    "{space}",
  ],
  packageDefault: [
    "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p [ ] \\",
    "{lock} a s d f g h j k l ; ' {enter}",
    "{shift} z x c v b n m , . / {shift}",
    ".com @ {space}",
  ],
  shift: [
    "~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}",
    "{tab} Q W E R T Y U I O P { } |",
    '{lock} A S D F G H J K L : " {enter}',
    "{shift} Z X C V B N M &lt; &gt; ? {shift}",
    ".com @ {space}",
  ],
};

const custom = [
  "1 2 3 4 5 6 7 8 9 0",
  "q w e r t y u i o p",
  "a s d f g h j k l",
  "z x c v b n m",
];

const keys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
layout.myDefault = custom;

const showGameStatus = (count, hasWon, uniqueLetters) => {
  if (hasWon) {
    return `Great job, Chief! You won!`;
  }
  if (!hasWon && count === 0) {
    return "You lost! Give it another try?";
  }
  return `${count} ${uniqueLetters}`;
};

const gameLogic = ({
  count,
  hasWon,
  uniqueLetters,
  setUniqueLetters,
  words,
  countReducer,
  setWords,
  setHasWon,
  event,
}) => {
  if (count > 0 && hasWon === false) {
    const press = event.key.toUpperCase();

    if (!uniqueLetters.find((item) => item === press)) {
      setUniqueLetters((u) => [...u, press]);
      const flattenLetters = [...words.flatMap((m1) => m1.letters)];

      const letterIndex = flattenLetters.findIndex((l) => l.letter === press);

      // only decrement count if it's a wrong guess
      if (letterIndex === -1) countReducer({ type: "decrement" });

      if (letterIndex !== -1 && !flattenLetters[letterIndex].isFound) {
        const t = words.map((m1) => {
          return {
            ...m1,
            letters: m1.letters.map((l1) => {
              if (l1.letter === press) {
                return { ...l1, isFound: true };
              } else return l1;
            }),
          };
        });
        let c = 0;
        for (let i_1 = 0; i_1 < t.length; i_1++) {
          for (let i_2 = 0; i_2 < t[i_1].letters.length; i_2++) {
            if (t[i_1].letters[i_2].isFound === false) c++;
          }
        }
        setWords(t);
        console.log("this is c", c);
        if (c === 0) {
          console.log("setting haswon state");
          setHasWon(true);
        }
      }
    }
  } else if (count === 0) {
  } else {
  }
};

export { layout, keys, showGameStatus, gameLogic };
