import { useState, useContext, useEffect, useCallback } from "react";
import SmoothCollapse from "react-smooth-collapse";
import ControlsContainer from "./components/ControlsContainer";
import styled from "styled-components";
import { TreeContext } from "./Context";
import { useEscapeKey } from "./util";
import {
  GoogleTranslateButton,
  DeepLTranslateButton,
} from "./components/TranslateButton";
import { Problem, extractPlaceholders } from "./problem";
import { isEqual } from "lodash";
import { SourceMatch } from "./components/SourceMatch";

function Value({
  language,
  editing,
  value,
  onChange,
  onEdit,
  issues,
  hintForTranslation,
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
  const change = useCallback(
    (event) => {
      onChange(event.target.value);
      setAutoFocus(false);
    },
    [onChange]
  );
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
            onChange={change}
            ref={(elem) => {
              if (elem && autoFocus) elem.select();
            }}
          />
          {focused && hintForTranslation ? (
            <>
              <DeepLTranslateButton
                text={hintForTranslation.value}
                fromLanguage={hintForTranslation.language}
                toLanguage={language}
                onResult={onChange}
              />
              <GoogleTranslateButton
                text={hintForTranslation.value}
                fromLanguage={hintForTranslation.language}
                toLanguage={language}
              />
            </>
          ) : null}
        </>
      ) : (
        <ValueWrapper
          value={value}
          problems={issues.map(({ problem }) => problem)}
          title={
            issues.length
              ? issues.map(({ hint }) => hint).join("\n")
              : undefined
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

  const problems =
    problematicTranslations
      ?.filter(({ id }) => id === node.id)
      .map(({ problem }) => problem) || [];

  const problemHints = [];
  if (problems.includes(Problem.NO_MATCH_IN_SOURCES))
    problemHints.push("\u26A0 No match found in the sources");
  if (problems.includes(Problem.PARTIAL_MATCH_IN_SOURCES))
    problemHints.push("\u26A0 Partial match in sourcefiles");

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
            problemHints.length
              ? `${node.id}\n${problemHints.join("\n")}`
              : node.id
          }
          problems={problems}
        >
          {node.name}
        </Label>
        <ValuesContainer>
          {languages.map((language) => {
            const value = values[language];
            const issues = [];

            if (
              problems.includes(Problem.MISSING) &&
              (value === undefined || value === null)
            ) {
              issues.push({
                problem: Problem.MISSING,
                hint: "\u26A0 issue: Missing value",
              });
            } else if (problems.includes(Problem.EMPTY) && !value?.trim()) {
              issues.push({
                problem: Problem.EMPTY,
                hint: "\u26A0 Potential issue: Empty value",
              });
            }

            if (problems.includes(Problem.DEFAULT) && value === node.id) {
              issues.push({
                problem: Problem.DEFAULT,
                hint: `\u26A0 Potential issue: Default value used "${value}"`,
              });
            }

            if (problems.includes(Problem.SAME)) {
              const sameAsLanguage = Object.keys(values).find(
                (l) => l !== language && values[l] === value
              );
              if (sameAsLanguage)
                issues.push({
                  problem: Problem.SAME,
                  hint: `\u26A0 Potential issue: The same as the "${sameAsLanguage}" version`,
                });
            }

            if (problems.includes(Problem.PLACEHOLDER_MISMATCH)) {
              const differentInLanguage = Object.keys(values).find(
                (l) =>
                  l !== language &&
                  !isEqual(
                    extractPlaceholders(values[l]),
                    extractPlaceholders(value)
                  )
              );
              if (differentInLanguage)
                issues.push({
                  problem: Problem.PLACEHOLDER_MISMATCH,
                  hint: `\u26A0 Potential issue: Different placeholders from the "${differentInLanguage}" version`,
                });
            }

            const hintLanguage = Object.keys(values).find(
              (l) => l !== language && values[l]
            );

            return (
              <Value
                key={language}
                language={language}
                editing={editing}
                issues={issues}
                value={value}
                hintForTranslation={
                  hintLanguage && {
                    language: hintLanguage,
                    value: values[hintLanguage],
                  }
                }
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
          visible={showControls || showSources}
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
  background-color: ${({ problems }) =>
    problems.includes(Problem.MISSING)
      ? "salmon"
      : problems.includes(Problem.EMPTY) || problems.includes(Problem.DEFAULT)
      ? "moccasin"
      : problems.includes(Problem.NO_MATCH_IN_SOURCES)
      ? "lightgray"
      : problems.includes(Problem.PARTIAL_MATCH_IN_SOURCES)
      ? "darkseagreen"
      : problems.length
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
  ${({ problems }) =>
    problems.includes(Problem.MISSING)
      ? "background-color: red; color: white; font-style: italic; font-family: sans-serif, monospace;"
      : problems.includes(Problem.EMPTY)
      ? "background-color: orange;"
      : problems.length
      ? "background-color: lightcyan;"
      : ""}
`;

const ValueEditor = styled.textarea`
  font-size: 16px;
`;
