import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

const Stars = ({ words }) => {
  console.log(words);
  const renderStars = () => {
    if (words?.length > 0) {
      let html1 = words[0].split("").map((l) => {
        console.log(l);
        return <WordWrapper key={nanoid()}>{l}</WordWrapper>;
      });

      let html2 = words[1].split("").map((l) => {
        return <WordWrapper key={nanoid()}>{l}</WordWrapper>;
      });

      return [...html1, " ", ...html2];
    }
  };
  return <Wrapper>{renderStars()}</Wrapper>;
};

export default Stars;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const WordWrapper = styled.div`
  display: block;
`;
