const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A2C7C4",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default theme;
