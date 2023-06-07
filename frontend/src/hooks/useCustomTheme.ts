import { useContext } from "react";
import { CustomThemeContext } from "../providers/CustomThemeProvider";

export default function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider");
  }
  return context;
}
