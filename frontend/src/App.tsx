import { ThemeProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./utils/theme";

function App() {
  // const isBrowserDefaultDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches
  // const [theme, setTheme] = useState(isBrowserDefaultDark() ? "dark" : "light");

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Toaster position="top-center" />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
