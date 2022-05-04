import { useEffect, useState } from "react";
import { fetchDefinitions } from "../api/definitions";

const useDefinitions = (words) => {
  console.log("calling!!!");
  const [definitions, setDefinitions] = useState([]);
  useEffect(() => {
    if (!words || words.length === 0) {
    } else {
      const f = async () => {
        const def = await fetchDefinitions(words);
        setDefinitions([...def]);
      };
      f();
    }
  }, [words]);
  return [definitions, setDefinitions];
};

export default useDefinitions;
