import React, { useState } from "react";
import useKeypress from "react-use-keypress";
import { Box } from "@mui/material";
import { keys } from "../utils";
import { useCounterReducer } from "../hooks/useCounter";
import useInitialCall from "../hooks/useInitialCall";
import ResetButton from "../components/ResetButton";
import StarsLayout from "../components/Stars/StarsLayout";
const Main = () => {
  const [words, letters, loading, definitions, setWords, setLetters] =
    useInitialCall();
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [count, countReducer] = useCounterReducer();
  console.log(words);
  useKeypress(keys, (event) => {
    if (count > 0) {
      const press = event.key.toUpperCase();

      if (!uniqueLetters.find((item) => item === press)) {
        setUniqueLetters((u) => [...u, press]);
        const flattenLetters = [...words.flatMap((m1) => m1.letters)];
        console.log("this is flattenLetters", flattenLetters);
        const letterIndex = flattenLetters.findIndex((l) => l.letter === press);
        console.log("this is letterIndex", letterIndex);

        // only decrement count if it's a wrong guess
        if (letterIndex === -1) countReducer({ type: "decrement" });

        if (letterIndex !== -1 && !flattenLetters[letterIndex].isFound) {
          console.log("coming here?");
          setWords(
            words.map((m1) => {
              return {
                ...m1,
                letters: m1.letters.map((l1) => {
                  if (l1.letter === press) {
                    return { ...l1, isFound: true };
                  } else return l1;
                }),
              };
            })
          );
        }
      }
    } else if (count === 0) {
    } else {
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        style={{ border: "1px red solid" }}
      >
        <StarsLayout loading={loading} words={words} />
        <div className="container m-4 p-4">
          <div>
            Guesses remaining: {count} {uniqueLetters}
          </div>
          <ResetButton onButtonClick={useInitialCall} />
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
            className="font-mono subpixel-antialiased"
          >
            1. <div>{definitions?.[0]}</div>
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
            className=" p-4 font-mono subpixel-antialiased"
          >
            2. <div>{definitions?.[1]}</div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Main;
