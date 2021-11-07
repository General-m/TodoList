import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TodoItemsContextProvider } from "./context/TodoItemsContext";
import { Content } from "./components/Content";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9012fe",
    },
    secondary: {
      main: "#b2aabf",
    },
  },
});

const App = () => {
  return (
    <TodoItemsContextProvider>
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </TodoItemsContextProvider>
  );
};

export default App;
