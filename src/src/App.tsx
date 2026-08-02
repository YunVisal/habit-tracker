import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppRouter from "./routes/router"
import SnackbarProvider from "./providers/snackbar_provider";

const App = () => {
  return <ThemeProvider theme={theme}>
    <SnackbarProvider>
      <CssBaseline />
      <AppRouter />
    </SnackbarProvider>
  </ThemeProvider>
}

export default App;