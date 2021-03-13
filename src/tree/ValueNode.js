import { useState, useContext, useEffect, useCallback } from "react";
import ControlsContainer from "./components/ControlsContainer";
import styled from "styled-components";
import { TreeContext } from "./Context";
import { useEscapeKey } from "./util";

function Value({ language, editing, value, onChange, onEdit, hint }) {
  const [autoFocus, setAutoFocus] = useState(false);
  useEffect(() => {
    if (!editing) {
      setAutoFocus(false);
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
            autoFocus={autoFocus}
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
          />
        </>
      ) : (
        <ValueWrapper
          value={value}
          onDoubleClick={() => {
            setAutoFocus(true);
            onEdit(true);
          }}
        >
          {value ?? "<missing>"}
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
    missingTranslations,
  } = useContext(TreeContext);

  const missingTranslation = missingTranslations.some((t) => t === node.id);

  return (
    <Container
      title={node.id}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Label missingTranslation={missingTranslation}>{node.name}</Label>
      <ValuesContainer>
        {languages.map((language) => {
          const hintLanguage = Object.keys(values).find(
            (l) => l !== language && values[l]
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
              value={values[language]}
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
  background-color: ${({ missingTranslation }) =>
    missingTranslation ? "salmon" : "lightgreen"};
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
  ${({ value }) =>
    value === undefined || value === null
      ? "background-color: red; color: white; font-style: italic;"
      : !value || !value.trim()
      ? "background-color: orange;"
      : ""}
`;
