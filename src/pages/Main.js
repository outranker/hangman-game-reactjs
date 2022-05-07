import React, { useState } from "react";
import styled from "styled-components";
import useKeypress from "react-use-keypress";
import Loading from "../components/Loading/Loading";
import { nanoid } from "nanoid";
import { keys } from "../utils";
import { useCounterReducer } from "../hooks/useCounter";
import useInitialCall from "../hooks/useInitialCall";
import ResetButton from "../components/ResetButton";

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
          <LetterCard
            key={letters[k].id}
            isWhiteSpace={letters[k].isWhiteSpace}
          >
            {letters[k].isWhiteSpace
              ? " "
              : letters[k].isFound
              ? letters[k].letter
              : "*"}
          </LetterCard>
        );
      }
      arr.push(t);
      // arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

      // loop second word - after whiteSpaceIndex
      t = [];
      for (let j = whiteSpaceIndex + 1; j < letters.length; j++) {
        t.push(
          <LetterCard
            key={letters[j].id}
            isWhiteSpace={letters[j].isWhiteSpace}
          >
            {letters[j].isWhiteSpace
              ? " "
              : letters[j].isFound
              ? letters[j].letter
              : "*"}
          </LetterCard>
        );
      }
      arr.push(t);
      // arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

      return arr;
    }
  };

  const reset = () => {};
  return (
    <>
      <div
        className="h-full w-full container lg:mx-auto lg:w-3/4"
        style={{ border: "1px white solid" }}
      >
        <div className="container mx auto p-4">
          {loading ? (
            <Loading />
          ) : (
            renderStars()?.map((i) => (
              <SomeWrapper key={nanoid()}>{i}</SomeWrapper>
            ))
          )}
        </div>
        <div className="container m-4 p-4">
          <div>
            Guesses remaining: {count} {uniqueLetters}
          </div>
          <ResetButton resetStars={renderStars()} />
          {/* <ResetButton2 className="m-4">Reset</ResetButton2> */}
          <DefinitionsWrapper className="font-mono subpixel-antialiased">
            1. <div>{definitions?.[0]}</div>
          </DefinitionsWrapper>
          <DefinitionsWrapper className=" p-4 font-mono subpixel-antialiased">
            2. <div>{definitions?.[1]}</div>
          </DefinitionsWrapper>
        </div>
      </div>
    </>
  );
};

const LetterCard = styled.div`
  border-bottom: ${(props) => {
    if (!props.isWhiteSpace) {
      return "1px solid #69778c;";
    } else return;
  }};
  margin-left: 3px;
  margin-right: 3px;
  padding: 0 5px 0 5px;
`;

const ResetButton2 = styled.button`
  border-radius: 3px;
  background-color: #363658;
  border: 1px solid gray;
  padding: 6px;
  :hover {
    background-color: #61619e;
  }
  :active {
    border: 1px solid green;
  }
`;
const DefinitionsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
`;
const SomeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: 1.2rem;
  justify-content: flex-start;
  margin: 8px 5px 8px 5px;
`;

export default Main;
