import { Theme, ThemeProvider } from "@emotion/react";
import { ReactNode, createContext, useState } from "react";
import { customTheme } from "../utils/theme";

interface ICustomThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

export const CustomThemeContext = createContext<ICustomThemeContext | null>(
  null
);

interface CustomThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const checkPreferDark = (): boolean => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) return isBrowserDefaultDark();
    if (localTheme === "dark") return true;
    return false;
  };

  const [theme, setTheme] = useState({
    ...customTheme,
    isDark: checkPreferDark(),
  });

  const toggleTheme = () => {
    setTheme((theme) => {
      const isDark = !theme.isDark;
      localStorage.setItem("theme", isDark ? "dark" : "light");
      return {
        ...theme,
        isDark,
      };
    });
  };

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
