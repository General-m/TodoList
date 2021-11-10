import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { useMuiTheme } from "./theme";
import { TodoItemsContextProvider } from "./context/TodoItemsContext";
import { Content } from "./components/Content";

const App = () => {
  const theme = useMuiTheme();
  return (
    <TodoItemsContextProvider>
      <ThemeProvider theme={theme}>
        <Content />
      </ThemeProvider>
    </TodoItemsContextProvider>
  );
};

export default App;
