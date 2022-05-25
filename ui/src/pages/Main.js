/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import useKeypress from "react-use-keypress";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Box, Typography } from "@mui/material";
import { showGameStatus, gameLogic } from "../utils";
import { keys, layout } from "../keys";
import { useCounterReducer } from "../hooks/useCounter";
import useInitialCall from "../hooks/useInitialCall";
import ResetButton from "../components/ResetButton";
import StarsLayout from "../components/Stars/StarsLayout";
import SectionsCard from "../components/SectionsCard";
import UniqueLettersGrid from "../components/UniqueLetters/UniqueLetters";

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

  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [lastPressedLetter, setLastPressedLetter] = useState("");
  const [count, countReducer] = useCounterReducer();
  const keyboard = useRef();

  const handleResetButtonClick = () => {
    setButtonTrigger(!buttonTrigger);
    setUniqueLetters([]);
    setDefinitions([]);
    setLetters([]);
    countReducer({ type: "restart" });
    setHasWon(false);
    return;
  };
  const callGameLogic = (event, fnLastLetter) => {
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
      fnLastLetter,
    });
  };
  useKeypress(keys, (event) => {
    if (event.key.toLowerCase() === "enter") {
      handleResetButtonClick();
      return;
    }
    callGameLogic(event, setLastPressedLetter);
  });
  const wasmButtonClick = () => {
    window.sayHelloJS("this.state.message");
  };
  const onKeyPress = (button) => {
    if (keys.includes(button))
      callGameLogic({ key: button }, setLastPressedLetter);
  };
  return (
    <>
      <Box sx={boxWrapperStyles}>
        <SectionsCard cardType={"stars"}>
          <StarsLayout loading={loading} words={words} />
        </SectionsCard>
        <SectionsCard cardType={"guesses"}>
          <Typography variant="h6">
            Guesses remaining: {showGameStatus(count, hasWon)}
          </Typography>
          <UniqueLettersGrid
            uniqueLetters={uniqueLetters}
            lastPressedLetter={lastPressedLetter}
          />
        </SectionsCard>
        <SectionsCard cardType={"guesses"}>
          <ResetButton
            cardType={"resetButton"}
            onButtonClick={handleResetButtonClick}
          />
        </SectionsCard>
        <SectionsCard cardType={"defs"}>
          <Typography>1. {definitions?.[0]}</Typography>
          <Typography>2. {definitions?.[1]}</Typography>
        </SectionsCard>
        <div id="message"></div>
        <button onClick={wasmButtonClick}>click me!</button>
        <Box
          sx={{
            display: {
              md: "none",
            },
            width: "100%",
            color: "black",
          }}
        >
          <SectionsCard customStyles={{ backgroundColor: "#194182" }}>
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layoutName={"default"}
              backgroundColor="#72C8FF"
              layout={layout}
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
  flexItems: "wrap",
  justifyContent: "space-around",
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
