/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import useKeypress from "react-use-keypress";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Box, Typography } from "@mui/material";
import { keys, layout, showGameStatus, gameLogic } from "../utils";
import { useCounterReducer } from "../hooks/useCounter";
import useInitialCall from "../hooks/useInitialCall";
import ResetButton from "../components/ResetButton";
import StarsLayout from "../components/Stars/StarsLayout";
import SectionsCard from "../components/SectionsCard";

const Main = () => {
  const [
    words,
    letters,
    loading,
    definitions,
    setWords,
    setLetters,
    setLoading,
    setDefinitions,
    buttonTrigger,
    setButtonTrigger,
  ] = useInitialCall();
  const handleResetButtonClick = () => {
    setButtonTrigger(!buttonTrigger);
  };
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [count, countReducer] = useCounterReducer();
  const keyboard = useRef();

  const onChange = (input) => {
    console.log("Input changed", input);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);
  };

  useKeypress(keys, (event) => {
    gameLogic({
      count,
      hasWon,
      uniqueLetters,
      setUniqueLetters,
      words,
      countReducer,
      setWords,
      setHasWon,
      event,
    });
  });

  return (
    <>
      <Box
        sx={boxWrapperStyles}
        style={{ padding: "5px", border: "1px red solid" }}
      >
        <SectionsCard cardType={"stars"}>
          <StarsLayout loading={loading} words={words} />
        </SectionsCard>
        <SectionsCard cardType={"guesses"}>
          <Typography variant="h6">
            Guesses remaining: {showGameStatus(count, hasWon, uniqueLetters)}
          </Typography>
        </SectionsCard>
        <ResetButton
          cardType={"resetButton"}
          onButtonClick={handleResetButtonClick}
        />
        <SectionsCard cardType={"defs"}>
          <Typography>1. {definitions?.[0]}</Typography>
        </SectionsCard>
        <SectionsCard cardType={"defs"}>
          <Typography>2. {definitions?.[1]}</Typography>
        </SectionsCard>
        <Box
          sx={{
            display: {
              md: "none",
            },
            width: "100%",
            color: "black",
          }}
        >
          <SectionsCard>
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={"default"}
              layout={layout}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </SectionsCard>
        </Box>
      </Box>
    </>
  );
};

export default Main;

const boxWrapperStyles = {
  display: "flex",
  // justifyContent: "space-around",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "column",
  height: "100%",
  width: {
    xs: "100%",
    md: "700px",
    lg: "850px",
  },
  paddingTop: {
    sm: "0px",
    md: "160px",
    lg: "260px",
  },
};
