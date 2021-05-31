import React, { useCallback, useContext } from "react";
import { googleTranslate, deepl } from "../images";
import { Button } from "./Button";
import { getServerHost } from "../util";
import { TreeContext } from "../Context";

export function GoogleTranslateButton({ text, fromLanguage, toLanguage }) {
  const title = "Open on GoogleTranslate";
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

export function DeepLTranslateButton({
  text,
  fromLanguage,
  toLanguage,
  onResult,
}) {
  const title = "Translate with DeepL";
  const onClick = useCallback(() => {
    const url = new URL("/translate", `http://${getServerHost()}`);
    url.searchParams.set("text", text);
    url.searchParams.set("source_lang", fromLanguage.toUpperCase());
    url.searchParams.set("target_lang", toLanguage.toUpperCase());
    fetch(url.href)
      .then((response) => response.text())
      .then(onResult);
  }, [text, fromLanguage, toLanguage, onResult]);

  const {deepL} = useContext(TreeContext);

  return !deepL ? null : (
    <Button title={title} onClick={onClick}>
      <img src={deepl} width="12" alt={title} />
    </Button>
  );
}
