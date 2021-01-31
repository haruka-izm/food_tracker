import { createMuiTheme } from "@material-ui/core";


export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Arial',
    h1: {
      fontSize: 30,
      fontWeight: 200
    },
    button: {
      textTransform: 'none'
    },
  },
  palette: {
    secondary: {
      main: '#4caf50', // light green
      contrastText: '#fff'
    },
    warning: {
      main: '#FF0000' // red
    }
  }
});
