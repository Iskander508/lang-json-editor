import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getUrlParams, setUrlParam } from "./tree/util";

export default function LanguagesSelection(props: {
  supportedLanguages: string[];
  onSelectionChange: (languages: string[]) => void;
}) {
  const { supportedLanguages, onSelectionChange } = props;
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

  return (
    <SelectionWrapper>
      <button onClick={() => setShowLanguageSelection((s) => !s)}>
        Languages
      </button>
      {showLanguageSelection && (
        <Selection>
          {supportedLanguages.map((v) => (
            <span key={v}>
              <input
                type="checkbox"
                name={v}
                checked={languages.includes(v)}
                onChange={(event) => updateLanguage(v, event.target.checked)}
              />
              {v}
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
`;
