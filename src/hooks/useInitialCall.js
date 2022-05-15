import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { andrewMeadApi } from "../api/randomWords";
import { fetchDefinitions } from "../api/definitions";

const useInitialCall = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]); // stores metadata about lettes
  const [loading, setLoading] = useState(false);
  const [definitions, setDefinitions] = useState([]);
  const [buttonTrigger, setButtonTrigger] = useState(false);
  useEffect(() => {
    const f1 = async () => {
      setLoading(true);
      const w = await andrewMeadApi();
      // const w = { puzzle: "big star" };
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
      let wList = w.puzzle
        .split(" ")
        .map((i) => i.toUpperCase())
        .map((w) => ({
          id: nanoid(),
          word: w,
          letters: w.split("").map((e) => ({
            id: nanoid(),
            letter: e.toUpperCase(),
            isFound: false,
            isWhiteSpace: e === " " ? true : false,
          })),
        }));
      const def = await fetchDefinitions(wList.map((w) => w.word));
      setWords(wList);
      setLetters(temp);
      setDefinitions(def);
      setLoading(false);
    };
    f1();
  }, [buttonTrigger]);

  return [
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
  ];
};

export default useInitialCall;
