import React, { useState } from "react";
import styled from "styled-components";
import useKeypress from "react-use-keypress";
import Loading from "../components/Loading/Loading";
import { nanoid } from "nanoid";
import { keys } from "../utils";
import { useCounterReducer } from "../hooks/useCounter";
import useInitialCall from "../hooks/useInitialCall";

const Main = () => {
  const [words, letters, loading, definitions, setWords, setLetters] =
    useInitialCall();
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [count, countReducer] = useCounterReducer();

  useKeypress(keys, (event) => {
    if (count > 0) {
      const press = event.key.toUpperCase();
      console.log(letters);
      if (!uniqueLetters.find((item) => item === press)) {
        setUniqueLetters((u) => [...u, press]);
        const letterIndex = letters.findIndex((l) => l.letter === press);
        countReducer({ type: "decrement" });
        if (letterIndex !== -1 && !letters[letterIndex].isFound) {
          console.log(letterIndex);
          let t = letters[letterIndex];
          setLetters([
            ...letters.map((i) => {
              if (i.id === t.id) {
                return { ...t, isFound: true, id: nanoid() };
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
              : letters.isFound
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
              : letters.isFound
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
    <OuterWrapper>
      <Wrapper>
        <Hangman>
          <div>{}</div>
          <LettersWrapper>
            {loading ? (
              <Loading />
            ) : (
              renderStars()?.map((i) => (
                <SomeWrapper key={nanoid()}>{i}</SomeWrapper>
              ))
            )}
          </LettersWrapper>
          <Meta>
            <GuessesWrapper>
              <div>
                Guesses remaining: {count} {uniqueLetters}
              </div>
            </GuessesWrapper>
            <ResetButtonWrapper>
              <ResetButton>Reset</ResetButton>
            </ResetButtonWrapper>
            <DefinitionsWrapper className="font-mono subpixel-antialiased">
              1. <div>{definitions?.[0]}</div>
            </DefinitionsWrapper>
            <DefinitionsWrapper className="font-mono subpixel-antialiased">
              2. <div>{definitions?.[1]}</div>
            </DefinitionsWrapper>
          </Meta>
        </Hangman>
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Hangman = styled.div`
  margin-top: 60px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    padding: 10px;
  }
`;
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  > div {
    margin: 15px;
    margin-left: 0;
  }
`;
const LettersWrapper = styled.div`
  display: grid;
  margin: 0 15px 0 15px;
  font-size: 1.8rem;
`;
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
const GuessesWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;
const ResetButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
const ResetButton = styled.button`
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
