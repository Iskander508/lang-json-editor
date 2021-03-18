import React from "react";
import { googleTranslate } from "../images";
import { Button } from "./Button";

export function TranslateButton({ text, fromLanguage, toLanguage, onResult }) {
  const title = 'Open on GoogleTranslate';
  return (
    <a
      href={`https://translate.google.com/?sl=${encodeURIComponent(
        fromLanguage
      )}&tl=${encodeURIComponent(toLanguage)}&text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button title={title}>
        <img src={googleTranslate} width="12" alt={title} />
      </Button>
    </a>
  );
}
