import { createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(44, 43, 43)",
      light: "rgb(250,250,250)",
    },
    secondary: {
      main: red[500],
    },
  },
});

export default theme;
