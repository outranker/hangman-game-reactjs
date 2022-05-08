import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import OuterWrapper from "./components/OuterWrapper";
import Main from "./pages/Main";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <OuterWrapper>
        <Main />
      </OuterWrapper>
      {/* // <Routes>
      //   <Route path="/" element={<Main />} />
      // </Routes> */}
    </ThemeProvider>
  );
};

export default App;
