import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { andrewMeadApi } from "../api/randomWords";
import { fetchDefinitions } from "../api/definitions";

const useInitialCall = () => {
  const [words, setWords] = useState([]);
  const [letters, setLetters] = useState([]); // stores metadata about lettes
  const [loading, setLoading] = useState(false);
  const [definitions, setDefinitions] = useState([]);
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
      let wList = w.puzzle.split(" ").map((i) => i.toUpperCase());
      const def = await fetchDefinitions(wList);
      setWords(wList);
      console.log({ wList });
      setLetters(temp);
      setDefinitions(def);
      console.log({ def });
      setLoading(false);
    };
    f1();
  }, []);

  return [
    words,
    letters,
    loading,
    definitions,
    setWords,
    setLetters,
    setLoading,
    setDefinitions,
  ];
};

export default useInitialCall;
