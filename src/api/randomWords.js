import axios from "axios";

/**
 * fetches 2 random words from an API
 * made by Andrew Mead
 */
export const andrewMeadApi = async () => {
  try {
    const res = await axios.get("https://puzzle.mead.io/puzzle?wordCount=2");
    if (data.status <= 300 && data.status >= 200) {
      return res.data;
    } else {
      throw new Error("random word api returned bad response code");
    }
  } catch (error) {
    throw new Error("random word api threw an error:" + error?.message);
  }
};
