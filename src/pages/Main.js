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
  const [usedLetters, setUsedLetters] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyboard = useRef();

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  useEffect(() => {
    const f1 = async () => {
      setLoading(true);
      const w = await andrewMeadApi();
      setLoading(false);
      setWords(w.puzzle.split(" ").map((i) => i.toUpperCase()));
    };
    f1();
  }, []);

  const renderStars = () => {
    const count = (Array.isArray(words) && words.length) || 0;
    console.log(count);
    if (count) {
      let arr = [];
      for (let i = 0; i < words.length; i++) {
        let stars = words[i].split("").map((el) => (
          <LetterCard key={nanoid()} isWord={true}>
            *
          </LetterCard>
        ));
        arr = [...arr, ...stars];
        if (i !== words.length - 1)
          arr.push(
            <LetterCard key={nanoid()} isWord={false}>
              {" "}
            </LetterCard>
          );
      }
      console.log("MY ARRAY", arr);
      return arr;
    }
  };
  console.log(words);

  const reset = () => {};
  return (
    <OuterWrapper>
      <Wrapper>
        <LettersWrapper>{loading ? <Loading /> : renderStars()}</LettersWrapper>
        <KeyboarWrapper>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={"default"}
            layout={customLayout}
            onKeyPress={onKeyPress}
          />
        </KeyboarWrapper>
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
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;
const LettersWrapper = styled.span`
  display: flex;
  flex-direction: row;
  font-size: large;
  padding: 0 16px 0 16px;
`;
const LetterCard = styled.div`
  border-bottom: ${(props) => {
    if (props.isWord) {
      return "1px solid #69778c;";
    } else return;
  }};
  margin-left: 3px;
  margin-right: 3px;
  padding: 0 5px 0 5px;
`;
const GuessesWrapper = styled.div``;
const ResetButtonWrapper = styled.div``;
const DefinitionsWrapper = styled.div``;
const KeyboarWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-top: 24px;
  color: black;
  @media (min-width: 769px) {
    display: none;
  }
`;

export default Main;
