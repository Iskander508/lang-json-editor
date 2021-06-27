import { useCallback, useState } from "react";
import styled from "styled-components";
import { exportJson } from "./action";
import { JsonData, TObjectNode } from "./protocol";
import { getUrlParams, useEscapeKey } from "./tree/util";

function download(language: string, data: JsonData) {
  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(data, undefined, 2)], {
    type: "application/json;charset=utf-8",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${language}.json`;

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function copyToClipboard(data: JsonData) {
  const text = JSON.stringify(data, undefined, 2);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export default function Export(props: { data: TObjectNode }) {
  const { data } = props;

  const [showContainer, setShowContainer] = useState(false);
  const [language, setLanguage] = useState<string>();

  const handleOpen = useCallback(() => {
    if (showContainer) {
      setShowContainer(false);
      return;
    }
    const { languages } = getUrlParams();
    if (!languages.length) return;
    if (!language) {
      setLanguage(languages[0]);
    }
    setShowContainer(true);
  }, [language, showContainer]);

  useEscapeKey(
    useCallback(() => {
      setShowContainer(false);
    }, [])
  );

  const handleDownload = useCallback(() => {
    if (language) download(language, exportJson(data, language));
  }, [data, language]);

  const handleCopyToClipboard = useCallback(() => {
    if (language) copyToClipboard(exportJson(data, language));
  }, [data, language]);

  return (
    <Wrapper>
      <button onClick={handleOpen}>Export</button>
      {showContainer && (
        <Container>
          <NonSelectable>
            Language:{" "}
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {getUrlParams().languages.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </NonSelectable>

          <Button disabled={!language} onClick={handleCopyToClipboard}>
            Copy to clipboard
          </Button>
          <Button disabled={!language} onClick={handleDownload}>
            Download
          </Button>
        </Container>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 0.5px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const NonSelectable = styled.span`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Button = styled.button`
  align-self: flex-end;
  margin-top: 1em;
`;
