import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import theme from "./styles/theme";

const App = () => {
  const [wasmState, setWasmState] = useState({});
  useEffect(() => {
    const instantiate = async () => {
      let { instance, module } = await WebAssembly.instantiateStreaming(
        fetch("main.wasm"),
        window.go.importObject
      );
      await window.go.run(instance);
      setWasmState({
        mod: module,
        inst: instance,
      });
    };
    instantiate();
  }, []);
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
