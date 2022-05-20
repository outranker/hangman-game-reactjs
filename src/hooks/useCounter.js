import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "restart":
      return 9;
    default:
      throw new Error();
  }
};
export function useCounterReducer() {
  const [state, dispatch] = useReducer(reducer, 9);

  return [state, dispatch];
}
