import { useState, useContext, useEffect, useCallback } from "react";
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
import { TValueNode } from "../protocol";

type TValueProps = {
  language: string;
  editing: boolean;
  value: string;
  onChange: (v: string) => void;
  onEdit: (v: boolean) => void;
  issues: Array<{
    problem: Problem;
    hint: string;
  }>;
  hintForTranslation?: {
    language: string;
    value: string;
  };
};
function Value({
  language,
  editing,
  value,
  onChange,
  onEdit,
  issues,
  hintForTranslation,
}: TValueProps) {
  const [autoFocus, setAutoFocus] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputStyle, setInputStyle] = useState<{
    width: number;
    height: number;
    maxWidth: number;
  }>();
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
  useEscapeKey(editing ? cancelEdit : undefined);

  return (
    <ValueContainer>
      <LanguageTag>{language.toUpperCase()}</LanguageTag>
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
            <ValueButtons>
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
            </ValueButtons>
          ) : null}
        </>
      ) : (
        <ValueWrapper
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
              const left = elem.offsetLeft || 0;
              if (
                inputStyle?.width !== width ||
                inputStyle?.height !== height
              ) {
                setInputStyle({
                  width,
                  height,
                  maxWidth: document.body.offsetWidth - left - 100,
                });
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

type TValueNodeProps = {
  node: TValueNode;
};
export function ValueNode({ node }: TValueNodeProps) {
  const [showControls, setShowControls] = useState(false);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(node.values);
  const {
    languages,
    onChangeValue,
    onRemove,
    problematicTranslations,
    disabled,
  } = useContext(TreeContext);

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

  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Label title={node.id} problems={problems}>
        {node.name}
      </Label>
      <ValuesContainer>
        {languages?.map((language) => {
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
            (l) => l !== language && values[l] && values[l] !== node.id
          );

          return (
            <Value
              key={language}
              language={language}
              editing={editing}
              issues={issues}
              value={value}
              hintForTranslation={
                hintLanguage
                  ? {
                      language: hintLanguage,
                      value: values[hintLanguage],
                    }
                  : undefined
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
        visible={showControls}
        editing={editing}
        onBeginEdit={disabled ? undefined : () => setEditing(true)}
        onConfirmEdit={
          disabled
            ? undefined
            : () => {
                languages?.forEach((language) => {
                  const newValue = values[language];
                  const oldValue = node.values[language];
                  if (newValue !== oldValue) {
                    onChangeValue?.(node.id, language, newValue);
                  }
                });
                setEditing(false);
              }
        }
        onCancelEdit={disabled ? undefined : onCancelEdit}
        onRemove={
          disabled
            ? undefined
            : () => {
                onRemove?.(node.id);
              }
        }
        copyString={node.id}
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
  background-color: ${({ problems }: { problems: Problem[] }) =>
    problems.includes(Problem.MISSING)
      ? "salmon"
      : problems.includes(Problem.EMPTY) || problems.includes(Problem.DEFAULT)
      ? "moccasin"
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

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: monospace, monospace;
`;

const ValueWrapper = styled.div`
  padding: 0 8px;
  border: 0.5px solid black;
  ${({ problems }: { problems: Problem[] }) =>
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
  min-height: 1em;
`;

const ValueButtons = styled.div`
  display: flex;
  flex-direction: column;
`;
