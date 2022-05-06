import React from "react";
import { Routes, Route } from "react-router-dom";
import OuterWrapper from "./components/OuterWrapper";
import Main from "./pages/Main";

const App = () => {
  return (
    <OuterWrapper>
      <Main />
    </OuterWrapper>
    // <Routes>
    //   <Route path="/" element={<Main />} />
    // </Routes>
  );
};

export default App;
