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

export const getServerHost = () => {
  const url = new URL(window.location.href);
  const serverPort = url.searchParams.get("serverPort") || url.port;
  return `${url.hostname}:${serverPort}`;
};
