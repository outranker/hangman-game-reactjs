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
import UniqueLettersGrid from "../components/UniqueLetters";
import Shake from "../components/Shake";

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
  const callGameLogic = (event) => {
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
  };
  useKeypress(keys, (event) => {
    if (event.key.toLowerCase() === "enter") {
      handleResetButtonClick();
      return;
    }
    callGameLogic(event);
  });

  const onKeyPress = (button) => {
    if (keys.includes(button)) callGameLogic({ key: button });
  };
  return (
    <>
      <Box
        sx={boxWrapperStyles}
        style={
          {
            // padding: "5px",
            // border: "1px red solid"
          }
        }
      >
        <SectionsCard cardType={"stars"}>
          <StarsLayout loading={loading} words={words} />
        </SectionsCard>
        <SectionsCard cardType={"guesses"}>
          <Typography variant="h6">
            Guesses remaining:{" "}
            {showGameStatus(
              count,
              hasWon
              // uniqueLetters.map((u) => u.letter).join(",")
            )}
          </Typography>
          <UniqueLettersGrid
            letters={letters}
            uniqueLetters={uniqueLetters}
            words={words}
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
          {/* </SectionsCard>
        <SectionsCard cardType={"defs"}> */}
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
        <Shake />
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
