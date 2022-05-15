const { createTheme } = require("@mui/material");

const theme = createTheme({
  palette: {
    mode: "light",
    background: "black",
    primary: { main: "#01579b" },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

export default theme;
