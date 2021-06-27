import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { JsonData } from "./protocol";
import { getUrlParams, useEscapeKey } from "./tree/util";
import Dropzone from "react-dropzone";

function checkJson(text: string): JsonData | null {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export default function Import(props: {
  onImport: (language: string, data: JsonData) => void;
}) {
  const { onImport } = props;
  const jsonInput = useRef<HTMLTextAreaElement>(null);

  const [showContainer, setShowContainer] = useState(false);
  const [language, setLanguage] = useState<string>();
  const [valid, setValid] = useState(false);
  const [error, setError] = useState<string>();

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

  useEffect(() => {
    if (!showContainer) setError(undefined);
  }, [showContainer]);

  const handleSubmit = useCallback(() => {
    if (!language) {
      setError("No language");
      return;
    }

    setError(undefined);
    const data = checkJson(jsonInput.current?.value as string);
    if (!data) {
      setError("Invalid JSON");
      return;
    }

    try {
      onImport(language, data);
      setError("Success!");
    } catch (e) {
      setError("Import failed: " + e.toString());
      return;
    }
  }, [language, onImport]);

  const handleFileDrop = useCallback((files: File[]) => {
    files[0]
      .text()
      .then((text) => {
        setError(undefined);
        if (jsonInput.current) {
          jsonInput.current.value = text;
          setValid(checkJson(text) !== null);
        }
      })
      .catch((e) => setError(e.toString()));
  }, []);

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setValid(checkJson(event.target.value) !== null);
  }, []);

  return (
    <Wrapper>
      <button onClick={handleOpen}>Import</button>
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
          <Dropzone maxFiles={1} onDrop={handleFileDrop}>
            {({ getRootProps, isDragActive, isDragReject }) => (
              <FileDropWrapper
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              >
                <NonSelectable>
                  JSON: <JSONInput ref={jsonInput} onChange={onChange} />
                </NonSelectable>
              </FileDropWrapper>
            )}
          </Dropzone>

          <SubmitButton disabled={!language || !valid} onClick={handleSubmit}>
            Import
          </SubmitButton>
          <span>{error}</span>
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

const JSONInput = styled.textarea`
  font-family: monospace, monospace;
  font-size: 16px;
  padding: 0 8px;
  min-width: min(50vw, 400px);
  height: min(50vh, 400px);
`;

const NonSelectable = styled.span`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  margin-top: 1em;
`;

const FileDropWrapper = styled.div`
  border: ${(props: { isDragActive: boolean; isDragReject: boolean }) =>
    props.isDragActive
      ? "4px dashed " + (props.isDragReject ? "red" : "green")
      : "none"};
`;
