import React from "react";
// import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import theme from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Main />
      </Layout>
      {/* // <Routes>
      //   <Route path="/" element={<Main />} />
      // </Routes> */}
    </ThemeProvider>
  );
};

export default App;
