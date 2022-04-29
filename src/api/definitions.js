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
    return p;

    // if (data.status <= 300 && data.status >= 200) {
    //   return res.data;
    // } else {
    //   throw new Error("random word api returned bad response code");
    // }
  } catch (error) {
    throw new Error(
      "hangman api error, could not receive response from api:" + error?.message
    );
  }
};
