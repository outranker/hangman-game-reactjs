import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { andrewMeadApi } from "../api/randomWords";
import Stars from "../components/Stars";

const Main = () => {
  const [words, setWords] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  useEffect(() => {
    const f1 = async () => {
      const w = await andrewMeadApi();
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
        let stars = words[i]
          .split("")
          .map((el) => <LetterCard isWord={true}>*</LetterCard>);
        arr = [...arr, ...stars];
        if (i !== words.length - 1)
          arr.push(<LetterCard isWord={false}> </LetterCard>);
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
        <LettersWrapper>{renderStars()}</LettersWrapper>
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

export default Main;
