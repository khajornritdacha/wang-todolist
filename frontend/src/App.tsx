import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import { CustomThemeProvider } from "./providers/CustomThemeProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <CustomThemeProvider>
        <AuthProvider>
          <Toaster position="top-center" />
          <AppRoutes />
        </AuthProvider>
      </CustomThemeProvider>
    </>
  );
}

export default App;
