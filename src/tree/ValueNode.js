import { useState, useContext, useEffect, useCallback } from "react";
import ControlsContainer from "./components/ControlsContainer";
import styled from "styled-components";
import { TreeContext } from "./Context";
import { useEscapeKey } from "./util";
import { TranslateButton } from "./components/TranslateButton";
import { Problem } from "./problem";

function Value({
  language,
  editing,
  value,
  onChange,
  onEdit,
  hint,
  highlight,
}) {
  const [autoFocus, setAutoFocus] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!editing) {
      setAutoFocus(false);
      setFocused(false);
    }
  }, [editing]);

  const cancelEdit = useCallback(() => onEdit(false), [onEdit]);
  useEscapeKey(editing && cancelEdit);

  return (
    <ValueContainer value={value}>
      <LanguageTag>{language}</LanguageTag>
      {editing ? (
        <>
          <textarea
            onFocus={() => setFocused(true)}
            autoFocus={autoFocus}
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
          />
          {focused && hint ? (
            <TranslateButton
              text={hint.value}
              fromLanguage={hint.language}
              toLanguage={language}
            />
          ) : null}
        </>
      ) : (
        <ValueWrapper
          value={value}
          highlight={highlight}
          onDoubleClick={() => {
            setAutoFocus(true);
            onEdit(true);
          }}
        >
          {value?.trim()
            ? value
            : value === null || value === undefined
            ? "<missing>"
            : `"${value}"`}
        </ValueWrapper>
      )}
    </ValueContainer>
  );
}

export function ValueNode({ node }) {
  const [showControls, setShowControls] = useState(false);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(node.values);
  const {
    languages,
    onChangeValue,
    onRemove,
    problematicTranslations,
  } = useContext(TreeContext);

  const problem = problematicTranslations.find(
    ({ id, problem }) => id === node.id
  )?.problem;

  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Label title={node.id} problem={problem}>
        {node.name}
      </Label>
      <ValuesContainer>
        {languages.map((language) => {
          const value = values[language];
          const hintLanguage = Object.keys(values).find(
            (l) => l !== language && values[l]
          );
          const highlight =
            problem === Problem.SAME &&
            Object.keys(values).find(
              (l) => l !== language && values[l] === value
            );
          return (
            <Value
              key={language}
              language={language}
              editing={editing}
              hint={
                hintLanguage && {
                  language: hintLanguage,
                  value: values[hintLanguage],
                }
              }
              value={value}
              highlight={highlight}
              onChange={(v) => setValues({ ...values, [language]: v })}
              onEdit={(v) => {
                setEditing(v);
                if (!v) {
                  setValues(node.values);
                }
              }}
            />
          );
        })}
      </ValuesContainer>
      <ControlsContainer
        editing={editing}
        onBeginEdit={() => setEditing(true)}
        onConfirmEdit={() => {
          languages.forEach((language) => {
            const newValue = values[language];
            const oldValue = node.values[language];
            if (newValue !== oldValue) {
              onChangeValue(node.id, language, newValue);
            }
          });
          setEditing(false);
        }}
        onCancelEdit={() => {
          setValues(node.values);
          setEditing(false);
        }}
        onRemove={() => {
          onRemove(node.id);
        }}
        copyString={node.id}
        visible={showControls}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`;

const Label = styled.div`
  cursor: default;
  background-color: ${({ problem }) =>
    problem === Problem.MISSING
      ? "salmon"
      : problem === Problem.EMPTY
      ? "moccasin"
      : problem
      ? "lightcyan"
      : "lightgreen"};
  font-family: monospace, monospace;
  padding: 0 8px;
  border: 0.5px solid black;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const ValuesContainer = styled.div``;

const LanguageTag = styled.span`
  cursor: default;
  padding: 0 8px;
  color: white;
  background-color: black;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: monospace, monospace;
`;

const ValueWrapper = styled.div`
  padding: 0 8px;
  border: 0.5px solid black;
  ${({ value, highlight }) =>
    value === undefined || value === null
      ? "background-color: red; color: white; font-style: italic;"
      : !value.trim()
      ? "background-color: orange;"
      : highlight
      ? "background-color: lightcyan;"
      : ""}
`;
