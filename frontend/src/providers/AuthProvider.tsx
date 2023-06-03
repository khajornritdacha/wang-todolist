import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../env";
import { CredentialDto, ErrorDto } from "../types/dto";

interface IAuthContext {
  isLoggedIn: boolean;
  email: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoggedIn, setLoggedIn] = useState(!!token);
  const [email, setEmail] = useState(user);

  const login = async (email: string, password: string) => {
    email = email.trim().toLowerCase();

    try {
      const res = await axios.post<CredentialDto>(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", email);
      setEmail(email);
      setLoggedIn(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err as AxiosError<ErrorDto>;
        const message = response?.data.message;
        if (message) throw new Error(message);
      }
      throw new Error("Unknown error");
    }
  };

  const logout = () => {
    toast.success("Log out successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setEmail(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
