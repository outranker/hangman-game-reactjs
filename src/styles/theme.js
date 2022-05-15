const { createTheme } = require("@mui/material");

const theme = createTheme({
  palette: {
    mode: "light",
    background: "black",
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

export default theme;
