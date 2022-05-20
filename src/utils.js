import { nanoid } from "nanoid";

const showGameStatus = (count, hasWon, uniqueLetters) => {
  if (hasWon) {
    return `Great job, Chief! You won!`;
  }
  if (!hasWon && count === 0) {
    return "You lost! Give it another try?";
  }
  return `${count} ${uniqueLetters || ""}`;
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

    if (!uniqueLetters.find((item) => item.letter === press)) {
      const flattenLetters = [...words.flatMap((m1) => m1.letters)];

      const letterIndex = flattenLetters.findIndex((l) => l.letter === press);

      // only decrement count if it's a wrong guess
      if (letterIndex === -1) countReducer({ type: "decrement" });

      if (letterIndex !== -1 && !flattenLetters[letterIndex].isFound) {
        setUniqueLetters((u) => [
          ...u,
          { id: nanoid(), letter: press, color: "green" },
        ]);
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

        if (c === 0) {
          setHasWon(true);
        }
      } else {
        setUniqueLetters((u) => [
          ...u,
          { id: nanoid(), letter: press, color: "red" },
        ]);
      }
    }
  } else if (count === 0) {
  } else {
  }
};

export { showGameStatus, gameLogic };
