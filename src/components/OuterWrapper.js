import React from "react";

const OuterWrapper = ({ children }) => {
  return <div style={{ height: "100vh", width: "100vw" }}>{children}</div>;
};

export default OuterWrapper;
