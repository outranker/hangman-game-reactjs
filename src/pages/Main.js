import React from "react";
import styled from "styled-components";
import Stars from "../components/Stars";

const Main = () => {
  return (
    <OuterWrapper>
      <Wrapper>
        Main
        <Stars words={words} />
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
export default Main;
