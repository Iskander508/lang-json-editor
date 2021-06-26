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
  const languages = url.searchParams.getAll("language");
  return { deepLKey, sessionId, languages };
};

export const setUrlParam = (name: string, value: string | string[]) => {
  const url = new URL(window.location.href);
  if (typeof value === "string") {
    url.searchParams.set(name, value);
  } else {
    url.searchParams.delete(name);
    value.forEach((v) => url.searchParams.append(name, v));
  }
  window.history.pushState({}, "", url.href);
};
