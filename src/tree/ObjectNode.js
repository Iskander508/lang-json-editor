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

export function ObjectNode({ node }) {
  const [expanded, setExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [adding, setAdding] = useState();
  const [addingLabel, setAddingLabel] = useState("");
  const { onAdd, onRemove, missingTranslations } = useContext(TreeContext);

  const missingTranslation = missingTranslations.some((t) =>
    t.startsWith(node.id)
  );

  const stopAdding = useCallback(() => {
    setAdding(undefined);
    setAddingLabel("");
  }, []);

  useEscapeKey(adding && stopAdding);

  const addingValid =
    addingLabel && !node.children.some(({ name }) => name === addingLabel);

  return (
    <>
      <NodeContainer
        title={node.id}
        onClick={() => setExpanded((c) => !c)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Label missingTranslation={missingTranslation} expanded={expanded}>
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
          />
          {addingValid ? (
            <Button
              onClick={() => {
                onAdd(node.id, adding, addingLabel);
                stopAdding();
              }}
            >
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
  background-color: ${({ missingTranslation, expanded }) =>
    missingTranslation
      ? expanded
        ? "pink"
        : "salmon"
      : expanded
      ? "mintcream"
      : "lightgreen"};
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
