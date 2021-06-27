import {
  add,
  edit,
  confirm,
  cancel,
  trash,
  copy,
  section,
  value,
} from "../images";
import styled from "styled-components";
import { Button } from "./Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

type TOperation = {
  name: string;
  image: string;
};

type TButton = {
  name: string;
  image: string;
  callback: () => void;
};

type TControlsProps = {
  operation?: TOperation;
  visible?: boolean;
  copyString?: string;
  buttons: Array<TButton | null | undefined>;
};

function Controls({
  operation,
  buttons,
  visible = true,
  copyString,
}: TControlsProps) {
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
            <img src={button.image} width="12" alt={button.name} />
          </Button>
        ) : null
      )}
      {copyString ? (
        <CopyToClipboard text={copyString}>
          <Button title={`copy "${copyString}"`}>
            <img src={copy} width="12" alt={`copy ${copyString}`} />
          </Button>
        </CopyToClipboard>
      ) : null}
    </Container>
  );
}

type TMainControlsProps = {
  visible?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  onSources?: () => void;
  copyString?: string;
};

export function MainControls({
  visible,
  onAdd,
  onRemove,
  onEdit,
  copyString,
}: TMainControlsProps) {
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

type TConfirmControlsProps = {
  editMode?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmControls({
  onConfirm,
  onCancel,
  editMode,
}: TConfirmControlsProps) {
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

type TAddControlsProps = {
  onObject: () => void;
  onValue: () => void;
  onCancel: () => void;
};

export function AddControls({
  onObject,
  onValue,
  onCancel,
}: TAddControlsProps) {
  return (
    <Controls
      operation={{
        name: "add",
        image: add,
      }}
      buttons={[
        { name: "section", image: section, callback: onObject },
        { name: "value", image: value, callback: onValue },
        { name: "cancel", image: cancel, callback: onCancel },
      ]}
    />
  );
}

const Container = styled.div`
  cursor: default;
`;

const Operation = styled.span`
  font-size: 10px;
  opacity: 0.8;
`;
