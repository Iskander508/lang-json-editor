import { useEffect, useState } from "react";
import { func, bool, string } from "prop-types";
import { MainControls, ConfirmControls, AddControls } from "./Controls";
import { NodeType } from "../../protocol";
import { useEscapeKey } from "../util";

export const ConfirmationModes = {
  remove: "REMOVE_MODE",
  edit: "EDIT_MODE",
  add: "ADD_MODE",
};

export const ControlsContainer = ({
  editing,
  visible,
  onAdd,
  onRemove,
  onConfirmEdit,
  onCancelEdit,
  onBeginEdit,
  copyString,
}) => {
  const [mode, setMode] = useState(
    editing ? ConfirmationModes.edit : undefined
  );
  useEffect(() => {
    setMode(editing ? ConfirmationModes.edit : undefined);
  }, [editing]);

  const withResetMode = (fn, ...args) => () => {
    setMode(undefined);
    fn?.(...args);
  };

  useEscapeKey(
    mode &&
      withResetMode(mode === ConfirmationModes.edit ? onCancelEdit : undefined)
  );

  switch (mode) {
    case ConfirmationModes.add:
      return (
        <AddControls
          onObject={withResetMode(onAdd, NodeType.OBJECT)}
          onValue={withResetMode(onAdd, NodeType.VALUE)}
          onCancel={withResetMode()}
        />
      );
    case ConfirmationModes.remove:
    case ConfirmationModes.edit:
      return (
        <ConfirmControls
          editMode={mode === ConfirmationModes.edit}
          onConfirm={withResetMode(
            mode === ConfirmationModes.edit ? onConfirmEdit : onRemove
          )}
          onCancel={withResetMode(
            mode === ConfirmationModes.edit ? onCancelEdit : undefined
          )}
        />
      );
    default:
      return (
        <MainControls
          visible={visible}
          copyString={copyString}
          onAdd={onAdd && (() => setMode(ConfirmationModes.add))}
          onRemove={onRemove && (() => setMode(ConfirmationModes.remove))}
          onEdit={
            onConfirmEdit &&
            (() => {
              setMode(ConfirmationModes.edit);
              onBeginEdit?.();
            })
          }
        />
      );
  }
};

ControlsContainer.propTypes = {
  editing: bool,
  visible: bool,
  onAdd: func,
  onRemove: func,
  onConfirmEdit: func,
  onCancelEdit: func,
  onBeginEdit: func,
  copyString: string,
};

ControlsContainer.defaultProps = {
  onBeginEdit: () => {},
};

export default ControlsContainer;
