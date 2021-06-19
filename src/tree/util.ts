import { useEffect } from "react";

export const useEscapeKey = (onEscape?: () => void) => {
  useEffect(() => {
    if (!onEscape) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onEscape]);
};

export const getUrlParams = () => {
  const url = new URL(window.location.href);
  const deepLKey = url.searchParams.get("deepLKey") || undefined;
  const sessionId = url.searchParams.get("sessionId") || undefined;
  return { deepLKey, sessionId };
};

export const setUrlParam = (name: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState({}, "", url.href);
};
