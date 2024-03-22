import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./Components/Navigation/NavBar";
import HowToPage from "./Components/HowTo/HowToPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "./Components/Context/HowToContext";

const queryClient = new QueryClient();
function App() {


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
      <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
              <ContextProvider>
                <NavBar/>
                <HowToPage/>
              </ContextProvider>
          </ThemeProvider>
      </QueryClientProvider>
  );
}

export default App;
