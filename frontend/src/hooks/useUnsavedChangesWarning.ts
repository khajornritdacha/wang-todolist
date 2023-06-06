import { useEffect } from "react";

export const useUnsavedChangesWarning = (condition: boolean) => {
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    if (condition) {
      e.preventDefault();
      e.returnValue = true;
    }
  };
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [condition]);

  return { beforeUnloadHandler };
};
