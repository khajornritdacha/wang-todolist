import AuthProvider from "./providers/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
// TODO: useAuth to check if user is logged in via access token

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
