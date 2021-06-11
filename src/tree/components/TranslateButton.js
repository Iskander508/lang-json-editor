import React, { useCallback, useContext, useState } from "react";
import { googleTranslate, deepl } from "../images";
import { Button } from "./Button";
import { TreeContext } from "../Context";
import deepLTranslate from "deepl";

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
  const { deepLKey } = useContext(TreeContext);
  const onClick = useCallback(() => {
    setLoading(true);
    deepLTranslate({
      text,
      source_lang: fromLanguage.toUpperCase(),
      target_lang: toLanguage.toUpperCase(),
      auth_key: deepLKey,
      free_api: deepLKey.endsWith(":fx"),
    })
      .then((result) => onResult(result.data.translations[0].text))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [deepLKey, text, fromLanguage, toLanguage, onResult]);

  return !deepLKey ? null : (
    <Button title={title} onClick={onClick} loading={loading}>
      <img src={deepl} width="12" alt={title} />
    </Button>
  );
}
