import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(44, 43, 43)",
      light: "rgb(250,250,250)",
    },
    secondary: {
      main: "rgb(184, 33, 33)",
    },
  },
});

export default theme;
