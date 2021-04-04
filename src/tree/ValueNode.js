import { useState, useContext, useEffect, useCallback } from "react";
import SmoothCollapse from "react-smooth-collapse";
import ControlsContainer from "./components/ControlsContainer";
import styled from "styled-components";
import { TreeContext } from "./Context";
import { useEscapeKey } from "./util";
import { TranslateButton } from "./components/TranslateButton";
import { Problem, extractPlaceholders } from "./problem";
import { isEqual } from "lodash";
import { SourceMatch } from "./components/SourceMatch";

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
  const [inputStyle, setInputStyle] = useState();
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
          <ValueEditor
            style={inputStyle}
            onFocus={() => setFocused(true)}
            autoFocus={autoFocus}
            value={value || ""}
            onChange={(event) => onChange(event.target.value)}
            ref={(elem) => {
              if (elem && autoFocus) elem.select();
            }}
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
          title={
            highlight ||
            (value !== null &&
              value !== undefined &&
              !value?.trim() &&
              "\u26A0 Potential issue: Empty value") ||
            ""
          }
          onDoubleClick={() => {
            setAutoFocus(true);
            onEdit(true);
          }}
          ref={(elem) => {
            if (elem) {
              const width = elem.offsetWidth;
              const height = elem.offsetHeight;
              if (
                inputStyle?.width !== width ||
                inputStyle?.height !== height
              ) {
                setInputStyle({ width, height });
              }
            }
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
  const [showSources, setShowSources] = useState(false);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(node.values);
  const {
    languages,
    onChangeValue,
    onRemove,
    problematicTranslations,
    disabled,
  } = useContext(TreeContext);

  useEscapeKey(showSources && (() => setShowSources(false)));

  const onCancelEdit = useCallback(() => {
    setValues(node.values);
    setEditing(false);
  }, [node]);

  useEffect(() => {
    if (disabled) {
      onCancelEdit();
    }
  }, [disabled, onCancelEdit]);

  const problem = problematicTranslations.find(({ id }) => id === node.id)
    ?.problem;

  const additionalProblemHint =
    problem === Problem.NO_MATCH_IN_SOURCES
      ? "\u26A0 No match found in the sources"
      : problem === Problem.PARTIAL_MATCH_IN_SOURCES
      ? "\u26A0 Partial match in sourcefiles"
      : "";

  const hasSourceMatches =
    node.exactSourceMatches?.length || node.partialSourceMatches?.length;
  return (
    <>
      <Container
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Label
          title={
            additionalProblemHint
              ? `${node.id}\n${additionalProblemHint}`
              : node.id
          }
          problem={problem}
        >
          {node.name}
        </Label>
        <ValuesContainer>
          {languages.map((language) => {
            const value = values[language];
            const hintLanguage = Object.keys(values).find(
              (l) => l !== language && values[l]
            );
            const highlightLanguage =
              (problem === Problem.SAME &&
                Object.keys(values).find(
                  (l) => l !== language && values[l] === value
                )) ||
              (problem === Problem.PLACEHOLDER_MISMATCH &&
                Object.keys(values).find(
                  (l) =>
                    l !== language &&
                    !isEqual(
                      extractPlaceholders(values[l]),
                      extractPlaceholders(value)
                    )
                ));

            const highlight =
              highlightLanguage &&
              (problem === Problem.SAME
                ? `\u26A0 Potential issue: The same as the "${highlightLanguage}" version`
                : `\u26A0 Potential issue: Different placeholders from the "${highlightLanguage}" version`);
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
                  setEditing(!disabled && v);
                  if (!v) {
                    setValues(node.values);
                  }
                }}
              />
            );
          })}
        </ValuesContainer>
        <ControlsContainer
          visible={showControls}
          editing={editing}
          onBeginEdit={!disabled && (() => setEditing(true))}
          onConfirmEdit={
            !disabled &&
            (() => {
              languages.forEach((language) => {
                const newValue = values[language];
                const oldValue = node.values[language];
                if (newValue !== oldValue) {
                  onChangeValue(node.id, language, newValue);
                }
              });
              setEditing(false);
            })
          }
          onCancelEdit={!disabled && onCancelEdit}
          onRemove={
            !disabled &&
            (() => {
              onRemove(node.id);
            })
          }
          onSources={
            hasSourceMatches ? () => setShowSources((s) => !s) : undefined
          }
          copyString={node.id}
        />
      </Container>
      <Sources>
        <SmoothCollapse expanded={showSources}>
          {node.exactSourceMatches?.map((match, index) => (
            <SourceMatch key={`exact-${index}`} {...match} />
          ))}
          {node.partialSourceMatches?.map((match, index) => (
            <SourceMatch key={`partial-${index}`} {...match} />
          ))}
        </SmoothCollapse>
      </Sources>
    </>
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
      : problem === Problem.NO_MATCH_IN_SOURCES
      ? "lightgray"
      : problem === Problem.PARTIAL_MATCH_IN_SOURCES
      ? "darkseagreen"
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

const Sources = styled.div`
  padding-left: 20px;
  margin-bottom: 4px;
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
      ? "background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;"
      : !value.trim()
      ? "background-color: orange;"
      : highlight
      ? "background-color: lightcyan;"
      : ""}
`;

const ValueEditor = styled.textarea`
  font-size: 16px;
`;
