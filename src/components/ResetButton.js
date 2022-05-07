import React, { useState } from "react";

const ResetButton = ({ resetStars }) => {
  const [border, setBorder] = useState(
    "border-solid border border-indigo-500/40"
  );
  return (
    <button
      onMouseDown={() => setBorder("border-solid border border-green-500")}
      onMouseUp={() => setBorder("border-solid border border-indigo-500/40")}
      onClick={() => resetStars()}
      className={`${border} m-2 bg-indigo-500/40 shadow-lg rounded p-1 px-2 hover:shadow-cyan-500/40`}
    >
      Reset
    </button>
  );
};

export default ResetButton;
