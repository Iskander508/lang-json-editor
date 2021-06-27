import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getUrlParams, setUrlParam } from "./tree/util";

type Languages = Record<string, string>;
const SUPPORTED_LANGUAGES: Languages = {
  ar: "Arabic",
  bn: "Bengali",
  bg: "Bulgarian",
  ca: "Catalan",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  et: "Estonian",
  fil: "Filipino",
  fi: "Finnish",
  fr: "French",
  de: "German",
  el: "Greek",
  iw: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  lv: "Latvian",
  lt: "Lithuanian",
  ms: "Malay",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  zh: "Chinese",
  sk: "Slovak",
  sl: "Slovenian",
  es: "Spanish",
  sw: "Swahili",
  sv: "Swedish",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
};

async function getDeepLLanguages(deepLKey: string) {
  const freeApi = deepLKey?.endsWith(":fx");
  const url = new URL(
    `https://${freeApi ? "api-free" : "api"}.deepl.com/v2/languages`
  );
  url.searchParams.append("auth_key", deepLKey);
  return fetch(url.href)
    .then((response) => response.json())
    .then((data: Array<{ name: string; language: string }>) =>
      data.reduce<Languages>(
        (aggr, { name, language }) => ({
          ...aggr,
          [language.toLowerCase()]: name,
        }),
        {}
      )
    );
}

function sortAlphabetically(a: string, b: string) {
  return a < b ? -1 : a > b ? 1 : 0;
}

export default function LanguagesSelection(props: {
  onSelectionChange: (languages: string[]) => void;
}) {
  const { onSelectionChange } = props;
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [languages, setLanguages] = useState<string[]>(
    getUrlParams().languages
  );

  const updateLanguage = useCallback(
    (lang: string, enabled: boolean) => {
      const updated = enabled
        ? [...languages, lang]
        : languages.filter((x) => x !== lang);
      setLanguages(updated);
      setUrlParam("language", updated);
    },
    [languages]
  );

  useEffect(() => {
    onSelectionChange(languages);
  }, [languages, onSelectionChange]);

  const [supportedLanguages, setSupportedLanguages] =
    useState<Languages>(SUPPORTED_LANGUAGES);
  useEffect(() => {
    const { deepLKey } = getUrlParams();
    if (deepLKey) {
      getDeepLLanguages(deepLKey).then(setSupportedLanguages);
    }
  }, []);

  return (
    <SelectionWrapper>
      <button onClick={() => setShowLanguageSelection((s) => !s)}>
        Languages
      </button>
      {showLanguageSelection && (
        <Selection>
          {Object.keys(supportedLanguages)
            .sort((a, b) =>
              sortAlphabetically(supportedLanguages[a], supportedLanguages[b])
            )
            .map((code) => (
              <span key={code}>
                <CheckBox
                  type="checkbox"
                  name={supportedLanguages[code]}
                  checked={languages.includes(code)}
                  onChange={(event) =>
                    updateLanguage(code, event.target.checked)
                  }
                />
                {supportedLanguages[code]}
              </span>
            ))}
        </Selection>
      )}
    </SelectionWrapper>
  );
}

const SelectionWrapper = styled.div`
  position: relative;
`;

const Selection = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 0.5px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  min-width: 120px;
`;

const CheckBox = styled.input`
  margin-right: 8px;
`;
