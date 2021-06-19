import React, { useCallback, useState } from "react";
import { googleTranslate, deepl } from "../images";
import { Button } from "./Button";
import deepLTranslate from "deepl";
import { getUrlParams } from "../util";

type TGoogleTranslateButtonProps = {
  text: string;
  fromLanguage: string;
  toLanguage: string;
};

export function GoogleTranslateButton({
  text,
  fromLanguage,
  toLanguage,
}: TGoogleTranslateButtonProps) {
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

const { deepLKey } = getUrlParams();

type TDeepLTranslateButtonProps = {
  text: string;
  fromLanguage: string;
  toLanguage: string;
  onResult: (text: string) => void;
};

export function DeepLTranslateButton({
  text,
  fromLanguage,
  toLanguage,
  onResult,
}: TDeepLTranslateButtonProps) {
  const title = "Translate with DeepL";
  const [loading, setLoading] = useState(false);
  const onClick = useCallback(() => {
    if (!deepLKey) return;
    setLoading(true);
    deepLTranslate({
      text,
      // @ts-ignore
      source_lang: fromLanguage.toUpperCase(),
      // @ts-ignore
      target_lang: toLanguage.toUpperCase(),
      auth_key: deepLKey,
      free_api: deepLKey.endsWith(":fx"),
    })
      .then((result) => onResult(result.data.translations[0].text))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [text, fromLanguage, toLanguage, onResult]);

  return !deepLKey ? null : (
    <Button title={title} onClick={onClick} loading={loading}>
      <img src={deepl} width="12" alt={title} />
    </Button>
  );
}
