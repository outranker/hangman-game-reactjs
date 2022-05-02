import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { andrewMeadApi } from "../api/randomWords";
import Stars from "../components/Stars";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { layout as customLayout } from "../utils";
import Loading from "../components/Loading/Loading";
import { nanoid } from "nanoid";

const Main = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]); // stores metadata about lettes
  const [usedLetters, setUsedLetters] = useState([]); // only has unique letters
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
  window.addEventListener("keypress", (e) => {
    const letter = String.fromCharCode(e.charCode);
    if (!usedLetters.find((l) => letter.toUpperCase() === l)) {
      setUsedLetters((oldArray) => [...oldArray, letter.toUpperCase()]);
    }

    console.log("Button pressed", letter);
  });
  useEffect(() => {
    const f1 = async () => {
      setLoading(true);
      const w = await andrewMeadApi();
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
      console.log("this is temp", temp);

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
      let arr;
      for (let i = 0; i < words.length; i++) {
        arr = letters.map((el) => (
          <LetterCard key={el.id} isWhiteSpace={el.isWhiteSpace}>
            {el.isWhiteSpace ? " " : letters.isFound ? el.letter : "*"}
          </LetterCard>
        ));
      }

      return arr;
    }
  };
  console.log(words);

  const reset = () => {};
  return (
    <OuterWrapper>
      <Content>
        <Left />
        <Center>
          <LettersWrapper>
            {loading ? <Loading /> : renderStars()}
          </LettersWrapper>
          <GuessesWrapper>
            <p>This is guesses placeholder</p>
          </GuessesWrapper>
          <ResetButtonWrapper>
            <button>Reset</button>
          </ResetButtonWrapper>
          <DefinitionsWrapper>
            <p>Definition 1</p>
          </DefinitionsWrapper>
          <DefinitionsWrapper>
            <p>Definition 2</p>
          </DefinitionsWrapper>
          {/* <KeyboarWrapper>
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={"default"}
              layout={customLayout}
              onKeyPress={onKeyPress}
            />
          </KeyboarWrapper> */}
        </Center>
        <Right />
      </Content>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Content = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto;
`;
const Left = styled.div`
  height: 100%;
  width: 100%;
`;
const Right = styled.div`
  height: 100%;
  width: 100%;
`;
const Center = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
`;
const LettersWrapper = styled.span`
  display: grid;
  grid: row;
  font-size: large;
  padding: 0 16px 0 16px;
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
const GuessesWrapper = styled.div``;
const ResetButtonWrapper = styled.div``;
const DefinitionsWrapper = styled.div`
  margin-bottom: 150px;
`;
const KeyboarWrapper = styled.div`
  position: absolute;
  height: 150px;
  width: 100%;
  bottom: 0;
  /* margin-top: 24px; */
  color: black;
  @media (min-width: 769px) {
    display: none;
  }
`;

export default Main;
