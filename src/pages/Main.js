import React, { useState } from "react";
import useKeypress from "react-use-keypress";
import Loading from "../components/Loading/Loading";
import { Box } from "@mui/material";
import { nanoid } from "nanoid";
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

  useKeypress(keys, (event) => {
    if (count > 0) {
      const press = event.key.toUpperCase();

      if (!uniqueLetters.find((item) => item === press)) {
        setUniqueLetters((u) => [...u, press]);
        const letterIndex = letters.findIndex((l) => l.letter === press);

        // only decrement count if it's a wrong guess
        if (letterIndex === -1) countReducer({ type: "decrement" });

        if (letterIndex !== -1 && !letters[letterIndex].isFound) {
          setLetters([
            ...letters.map((i) => {
              if (i.letter === press) {
                return { ...i, isFound: true };
              } else return i;
            }),
          ]);
        }
      }
    } else if (count === 0) {
    } else {
    }
  });

  const renderStars = () => {
    const count = (Array.isArray(words) && words.length) || 0;

    if (count) {
      let arr = [];
      const whiteSpaceIndex = letters.findIndex((item) => item.isWhiteSpace);

      // loop first word - until whiteSpaceIndex
      let t = [];
      for (let k = 0; k < whiteSpaceIndex; k++) {
        t.push(
          <div
            style={{
              borderBottom: `${
                !letters[k].isWhiteSpace ? "1px solid #69778c" : ""
              }`,
              marginLeft: "3px",
              marginRight: "3px",
              padding: "0 5px 0 5px",
            }}
            key={letters[k].id}
            isWhiteSpace={letters[k].isWhiteSpace}
          >
            {letters[k].isWhiteSpace
              ? " "
              : letters[k].isFound
              ? letters[k].letter
              : "*"}
          </div>
        );
      }
      arr.push(t);
      // arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

      // loop second word - after whiteSpaceIndex
      t = [];
      for (let j = whiteSpaceIndex + 1; j < letters.length; j++) {
        t.push(
          <div
            style={{
              borderBottom: `${
                !letters[j].isWhiteSpace ? "1px solid #69778c" : ""
              }`,
              marginLeft: "3px",
              marginRight: "3px",
              padding: "0 5px 0 5px",
            }}
            key={letters[j].id}
            isWhiteSpace={letters[j].isWhiteSpace}
          >
            {letters[j].isWhiteSpace
              ? " "
              : letters[j].isFound
              ? letters[j].letter
              : "*"}
          </div>
        );
      }
      arr.push(t);
      // arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

      return arr;
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        style={{ border: "1px red solid" }}
      >
        <div className="container mx auto p-4">
          {loading ? (
            <Loading />
          ) : (
            renderStars()?.map((i) => (
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  fontSize: "1.2rem",
                  justifyContent: "flex-start",
                  margin: "8px 5px 8px 5px",
                }}
                key={nanoid()}
              >
                {i}
              </div>
            ))
          )}
        </div>
        <StarsLayout words={words} />
        <div className="container m-4 p-4">
          <div>
            Guesses remaining: {count} {uniqueLetters}
          </div>
          <ResetButton resetStars={renderStars()} />
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
