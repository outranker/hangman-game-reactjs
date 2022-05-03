import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { andrewMeadApi } from "../api/randomWords";
import _ from "lodash";
import Stars from "../components/Stars";
// import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
// import { layout as customLayout } from "../utils";
import Loading from "../components/Loading/Loading";
import { nanoid } from "nanoid";

const Main = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]); // stores metadata about lettes
  const [uniqueLetters, setUniqueLetters] = useState([]); // only has unique letters
  const [lastLetter, setLastLetter] = useState(""); // only has unique letters
  const [guesses, setGuesses] = useState([]); // all the pressed/used keys
  const [chances, setChances] = useState(9); // how many times can be guessed
  const [definitions, setDefinitions] = useState([]); // stores definitions
  const [loading, setLoading] = useState(false);
  const keyboard = useRef();

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };
  const resetButtonClick = (button) => {
    console.log("Reset Button pressed", button);
  };
  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      console.log({ chances });

      const letter = e.key;
      setLastLetter(letter.toUpperCase());
    });

    return () => {
      window.removeEventListener("keypress", () => {});
    };
  }, []);

  useEffect(() => {
    const uniq = _.uniq(guesses);
    setChances((ch) => ch - uniq.length);
    setUniqueLetters((l) => [...l, uniq]);
    // if (!uniqueLetters.find((l) => letter.toUpperCase() === l)) {
    //   setUniqueLetters((oldArray) => [...oldArray, letter.toUpperCase()]);
    //   if (chances > 0) {
    //     setChances((ch) => --ch);
    //   } else {
    //     setChances(0);
    //   }
    // }
  }, [lastLetter]);

  useEffect(() => {
    const f1 = async () => {
      setLoading(true);
      const w = await andrewMeadApi();
      // const w = {
      //   puzzle: "JKJKJJKKJFJFJHHDHDGDGDGGFHFH POIUYTREWQASDFGHJKKLMNBBVV",
      // };

      const temp = [];
      w.puzzle
        .split("")
        .map((e) => e.toUpperCase())
        .forEach((l) =>
          temp.push({
            id: nanoid(),
            letter: l,
            isFound: false,
            isWhiteSpace: l === " " ? true : false,
          })
        );

      setWords(w.puzzle.split(" ").map((i) => i.toUpperCase()));
      setLetters(temp);
      setLoading(false);
    };
    f1();
  }, []);

  const renderStars = () => {
    const count = (Array.isArray(words) && words.length) || 0;
    console.log(letters.length);
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
      arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

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
      arr.push(<SomeWrapper key={nanoid()}>{t}</SomeWrapper>);

      return arr;
    }
  };

  const reset = () => {};
  return (
    <OuterWrapper>
      <Wrapper>
        <Hangman>
          <LettersWrapper>
            {loading ? <Loading /> : renderStars()}
          </LettersWrapper>
          <Meta>
            <GuessesWrapper>
              <div>
                Guesses remaining: {chances}
                {guesses}
              </div>
            </GuessesWrapper>
            <ResetButtonWrapper>
              <ResetButton>Reset</ResetButton>
            </ResetButtonWrapper>
            <DefinitionsWrapper>
              <div>Definition 1</div>
            </DefinitionsWrapper>
            <DefinitionsWrapper>
              <div>Definition 2</div>
            </DefinitionsWrapper>
          </Meta>
        </Hangman>
        {/* <KeyboarWrapper>
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={"default"}
              layout={customLayout}
              onKeyPress={onKeyPress}
            />
          </KeyboarWrapper> */}
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
  /* margin-bottom: 150px; */
`;
const SomeWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: 1.2rem;
  justify-content: flex-start;
  margin: 8px 5px 8px 5px;
`;
const KeyboarWrapper = styled.div`
  position: absolute;
  height: 150px;
  width: 100%;
  bottom: 0;
  color: black;
  @media (min-width: 769px) {
    display: none;
  }
`;

export default Main;
