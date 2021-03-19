import React from "react";
import { bool, func, string } from "prop-types";
import { add, edit, confirm, cancel, trash, copy } from "../images";
import styled from "styled-components";
import { Button } from "./Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Controls({ operation, buttons, visible = true, copyString }) {
  const visibilityStyle = {
    opacity: visible ? 1 : 0,
  };
  return (
    <Container style={visibilityStyle}>
      {operation ? (
        <Operation>
          <img src={operation.image} width="16" alt={operation.name} />
        </Operation>
      ) : null}
      {buttons.map((button) =>
        button ? (
          <Button
            key={button.name}
            onClick={(event) => {
              button.callback();
              event.stopPropagation();
            }}
            title={button.name}
          >
            {button.image ? (
              <img src={button.image} width="12" alt={button.name} />
            ) : null}
            {button.text ? button.text : null}
          </Button>
        ) : null
      )}
      {copyString ? (
        <CopyToClipboard text={copyString} title={`copy "${copyString}"`}>
          <Button>
            <img src={copy} width="12" alt={`copy ${copyString}`} />
          </Button>
        </CopyToClipboard>
      ) : null}
    </Container>
  );
}

export function MainControls({ visible, onAdd, onRemove, onEdit, copyString }) {
  return (
    <Controls
      visible={visible}
      buttons={[
        onAdd && { name: "add", image: add, callback: onAdd },
        onRemove && { name: "remove", image: trash, callback: onRemove },
        onEdit && { name: "edit", image: edit, callback: onEdit },
      ]}
      copyString={copyString}
    />
  );
}

MainControls.propTypes = {
  visible: bool.isRequired,
  onAdd: func,
  onRemove: func,
  onEdit: func,
  copyString: string,
};

export function ConfirmControls({ onConfirm, onCancel, editMode }) {
  const name = editMode ? "edit" : "remove";
  return (
    <Controls
      operation={{
        name,
        image: editMode ? edit : trash,
      }}
      buttons={[
        { name: `confirm ${name}`, image: confirm, callback: onConfirm },
        { name: `cancel ${name}`, image: cancel, callback: onCancel },
      ]}
    />
  );
}

ConfirmControls.propTypes = {
  onConfirm: func.isRequired,
  onCancel: func.isRequired,
};

export function AddControls({ onObject, onValue, onCancel }) {
  return (
    <Controls
      operation={{
        name: "add",
        image: add,
      }}
      buttons={[
        { name: "section", text: "{}", callback: onObject },
        { name: "value", text: '""', callback: onValue },
        { name: "cancel", image: cancel, callback: onCancel },
      ]}
    />
  );
}

AddControls.propTypes = {
  onObject: func.isRequired,
  onValue: func.isRequired,
  onCancel: func.isRequired,
};

const Container = styled.div`
  cursor: default;
`;

const Operation = styled.span`
  font-size: 10px;
  opacity: 0.8;
`;
