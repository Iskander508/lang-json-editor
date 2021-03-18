import { useState, useContext, useCallback } from "react";
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
  const { onAdd, onRemove, problematicTranslations } = useContext(TreeContext);

  const problems = problematicTranslations
    .filter(({ id }) => id.startsWith(node.id))
    .map(({ problem }) => problem);
  const problem = problems.includes(Problem.MISSING)
    ? Problem.MISSING
    : problems.includes(Problem.EMPTY)
    ? Problem.EMPTY
    : problems.includes(Problem.SAME)
    ? Problem.SAME
    : undefined;

  const stopAdding = useCallback(() => {
    setAdding(undefined);
    setAddingLabel("");
  }, []);

  useEscapeKey(adding && stopAdding);

  const addingValid =
    addingLabel && !node.children.some(({ name }) => name === addingLabel);

  const onConfirmAdd = addingValid
    ? () => {
        onAdd(node.id, adding, addingLabel);
        stopAdding();
      }
    : undefined;

  return (
    <>
      <NodeContainer
        onClick={() => setExpanded((c) => !c)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Label
          id={node.id}
          problem={problem}
          expanded={expanded}
          title={node.id}
        >
          <Caret>{expanded ? "-" : "+"}</Caret>
          {node.name}
        </Label>
        {expanded ? (
          <ControlsContainer
            visible={showControls}
            onAdd={(type) => setAdding(type)}
            onRemove={node.id && (() => onRemove(node.id))}
          />
        ) : (
          <Collapsed>{`{} ${node.children.length} item${
            node.children.length === 1 ? "" : "s"
          }`}</Collapsed>
        )}
      </NodeContainer>
      {adding ? (
        <>
          <input
            type="text"
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
          {node.children.map((n) =>
            n.type === NodeType.OBJECT ? (
              <ObjectNode key={n.id} node={n} />
            ) : (
              <ValueNode key={n.id} node={n} />
            )
          )}
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
      return expanded ? "white" : "moccasin";
    case Problem.SAME:
      return expanded ? "white" : "lightcyan";
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
