import React from "react";
import { nanoid } from "nanoid";

const Stars = ({ words }) => {
  console.log(words);
  const renderStars = () => {
    if (words?.length > 0) {
      let html1 = words[0].split("").map((l) => {
        console.log(l);
        return (
          <div style={{ display: "block" }} key={nanoid()}>
            {l}
          </div>
        );
      });

      let html2 = words[1].split("").map((l) => {
        return (
          <div style={{ display: "block" }} key={nanoid()}>
            {l}
          </div>
        );
      });

      return [...html1, " ", ...html2];
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>{renderStars()}</div>
  );
};

export default Stars;
