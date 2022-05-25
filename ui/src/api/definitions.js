import axios from "axios";

/**
 * fetches definitions for words from hangman backend
 * uses Promise.all api for concurrent http calls
 */
export const fetchDefinitions = async (words) => {
  try {
    const [word1, word2] = words;

    const p1 = axios.get(
      `https://hangman-api.javohirmirzo.fun/v1/hangman/get-word-definition?word=${word1}`
    );
    const p2 = axios.get(
      `https://hangman-api.javohirmirzo.fun/v1/hangman/get-word-definition?word=${word2}`
    );

    const pList = [p1, p2];
    const p = await Promise.all(pList);

    const d1 = p[0].data.result.data[0].meanings[0].definitions[0].definition;
    const d2 = p[1].data.result.data[0].meanings[0].definitions[0].definition;

    return [d1, d2];
  } catch (error) {
    console.log(error);
    throw new Error(
      "hangman api error, could not receive response from api:" + error?.message
    );
  }
};
