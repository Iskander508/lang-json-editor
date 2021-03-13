import { useEffect } from "react";

export const useEscapeKey = (onEscape) => {
  useEffect(() => {
    if (!onEscape) return;
    const handleEsc = (event) => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onEscape]);
};
