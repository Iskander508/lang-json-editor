import React, { useCallback, useContext, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const onClick = useCallback(() => {
    setLoading(true);
    const url = new URL("/translate", `http://${getServerHost()}`);
    url.searchParams.set("text", text);
    url.searchParams.set("source_lang", fromLanguage.toUpperCase());
    url.searchParams.set("target_lang", toLanguage.toUpperCase());
    fetch(url.href)
      .then((response) => response.text())
      .then(onResult)
      .finally(() => setLoading(false));
  }, [text, fromLanguage, toLanguage, onResult]);

  const { deepL } = useContext(TreeContext);

  return !deepL ? null : (
    <Button title={title} onClick={onClick} loading={loading}>
      <img src={deepl} width="12" alt={title} />
    </Button>
  );
}
