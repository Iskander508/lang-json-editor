import { TSourceMatch } from "./components/SourceMatch";
import { useEffect } from "react";
import { NodeType } from "../protocol";

export interface TNodeValues {
  [language: string]: string;
}

export type TNode = {
  id: string;
  name: string;
  type: keyof typeof NodeType;
  exactSourceMatches: TSourceMatch[];
  partialSourceMatches: TSourceMatch[];
  values: TNodeValues;
  children: TNode[];
};

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

export const getServerHost = () => {
  const url = new URL(window.location.href);
  const serverPort = url.searchParams.get("serverPort") || url.port;
  return `${url.hostname}:${serverPort}`;
};
