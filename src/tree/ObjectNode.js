import { useState, useContext, useCallback, useEffect } from "react";
import SmoothCollapse from "react-smooth-collapse";
import ControlsContainer from "./components/ControlsContainer";
import styled from "styled-components";
import { TreeContext } from "./Context";
import { NodeType } from "../protocol";
import { ValueNode } from "./ValueNode";
import { confirm, cancel } from "./images";
import { Button } from "./components/Button";
import { useEscapeKey } from "./util";
import { Problem } from "./problem";

export function ObjectNode({ node }) {
  const [expanded, setExpanded] = useState(!node.id);
  const [showControls, setShowControls] = useState(false);
  const [adding, setAdding] = useState();
  const [addingLabel, setAddingLabel] = useState("");

  const {
    onAdd,
    onRemove,
    problematicTranslations,
    filteredIds,
    disabled,
    collapseAll,
    onCollapseChange,
  } = useContext(TreeContext);

  const stopAdding = useCallback(() => {
    setAdding(undefined);
    setAddingLabel("");
  }, []);

  useEffect(() => {
    if (!expanded || disabled) {
      stopAdding();
    }
  }, [disabled, expanded, stopAdding]);

  useEffect(() => {
    if (collapseAll !== undefined) {
      setExpanded(!collapseAll);
    }
  }, [collapseAll]);

  useEscapeKey(adding && stopAdding);

  const problems = problematicTranslations
    .filter(({ id }) => id === node.id || id.startsWith(`${node.id}.`))
    .map(({ problem }) => problem);
  const mainProblem = problems.includes(Problem.MISSING)
    ? Problem.MISSING
    : problems.includes(Problem.EMPTY)
    ? Problem.EMPTY
    : problems.includes(Problem.NO_MATCH_IN_SOURCES)
    ? Problem.NO_MATCH_IN_SOURCES
    : problems.includes(Problem.DEFAULT)
    ? Problem.DEFAULT
    : problems.includes(Problem.SAME)
    ? Problem.SAME
    : undefined;

  const addingValid =
    addingLabel &&
    /^\w+$/.test(addingLabel) &&
    !node.children.some(({ name }) => name === addingLabel);

  const onConfirmAdd = addingValid
    ? () => {
        onAdd(node.id, adding, addingLabel);
        stopAdding();
      }
    : undefined;

  const onToggleCollapse = useCallback(() => {
    onCollapseChange();
    setExpanded((c) => !c);
  }, [onCollapseChange]);
  const onMouseEnter = useCallback(() => setShowControls(true), []);
  const onMouseLeave = useCallback(() => setShowControls(false), []);

  return (
    <>
      <NodeContainer
        onClick={onToggleCollapse}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Label
          id={node.id}
          problem={mainProblem}
          expanded={expanded}
          title={node.id}
        >
          <Caret>{expanded ? "-" : "+"}</Caret>
          {node.name}
        </Label>
        {expanded ? (
          !adding &&
          !disabled && (
            <ControlsContainer
              visible={showControls}
              onAdd={(type) => setAdding(type)}
              onRemove={node.id && (() => onRemove(node.id))}
            />
          )
        ) : (
          <Collapsed>{`{} ${node.children.length} item${
            node.children.length === 1 ? "" : "s"
          }`}</Collapsed>
        )}
      </NodeContainer>
      {adding ? (
        <>
          <NewItemInput
            type="text"
            autoFocus
            placeholder={
              adding === NodeType.OBJECT ? "new section" : "new value"
            }
            onChange={(event) => setAddingLabel(event.target.value.trim())}
            onKeyPress={(e) => e.key === "Enter" && onConfirmAdd?.()}
          />
          {addingValid ? (
            <Button onClick={onConfirmAdd}>
              <img src={confirm} width="16" alt="confirm" />
            </Button>
          ) : null}
          <Button onClick={stopAdding}>
            <img src={cancel} width="16" alt="cancel" />
          </Button>
        </>
      ) : null}
      <SubTree>
        <SmoothCollapse expanded={expanded}>
          {node.children.map((n) => {
            if (
              filteredIds &&
              !filteredIds.some(
                (id) => id === n.id || id.startsWith(`${n.id}.`)
              )
            ) {
              return null;
            }
            return n.type === NodeType.OBJECT ? (
              <ObjectNode key={n.id} node={n} />
            ) : (
              <ValueNode key={n.id} node={n} />
            );
          })}
        </SmoothCollapse>
      </SubTree>
    </>
  );
}

const getLabelBackground = ({ id, problem, expanded }) => {
  if (!id) return "white";
  switch (problem) {
    case Problem.MISSING:
      return expanded ? "pink" : "salmon";
    case Problem.EMPTY:
    case Problem.DEFAULT:
      return expanded ? "white" : "moccasin";
    case Problem.SAME:
      return expanded ? "white" : "lightcyan";
    case Problem.NO_MATCH_IN_SOURCES:
      return expanded ? "white" : "lightgrey";
    default:
      return expanded ? "mintcream" : "lightgreen";
  }
};

const NodeContainer = styled.div`
  cursor: default;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Caret = styled.span`
  min-width: 10px;
  margin-right: 2px;
`;

const Label = styled.span`
  background-color: ${getLabelBackground};
  font-family: monospace, monospace;
  padding: 0 8px;
  border: 0.5px solid black;
  border-radius: 4px;

  &:hover {
    font-weight: bold;
  }
`;

const Collapsed = styled.span`
  color: grey;
  margin: 0 8px;
`;

const SubTree = styled.div`
  padding-left: 20px;
  margin-bottom: 4px;
`;

const NewItemInput = styled.input`
  font-family: monospace, monospace;
  font-size: 16px;
  padding: 0 8px;
  margin-left: 20px;
  margin-bottom: 4px;
`;
