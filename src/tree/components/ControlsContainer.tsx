import { useEffect, useState } from "react";
import { MainControls, ConfirmControls, AddControls } from "./Controls";
import { NodeType } from "../../protocol";
import { useEscapeKey } from "../util";

export enum ConfirmationModes {
  remove = "REMOVE_MODE",
  edit = "EDIT_MODE",
  add = "ADD_MODE",
}

type TControlsContainerProps = {
  editing?: boolean;
  visible?: boolean;
  onAdd?: (type: NodeType) => void;
  onRemove?: () => void;
  onConfirmEdit?: () => void;
  onCancelEdit?: () => void;
  onBeginEdit?: () => void;
  onSources?: () => void;
  copyString?: string;
};

export const ControlsContainer = ({
  editing,
  visible,
  onAdd,
  onRemove,
  onConfirmEdit,
  onCancelEdit,
  onBeginEdit = () => {},
  onSources,
  copyString,
}: TControlsContainerProps) => {
  const [mode, setMode] = useState(
    editing ? ConfirmationModes.edit : undefined
  );
  useEffect(() => {
    setMode(editing ? ConfirmationModes.edit : undefined);
  }, [editing]);

  function withResetMode(fn?: () => void) {
    return () => {
      setMode(undefined);
      fn?.();
    };
  }

  useEscapeKey(
    mode &&
      withResetMode(mode === ConfirmationModes.edit ? onCancelEdit : undefined)
  );

  switch (mode) {
    case ConfirmationModes.add:
      return (
        <AddControls
          // @ts-ignore
          onObject={withResetMode(() => onAdd?.(NodeType.OBJECT))}
          // @ts-ignore
          onValue={withResetMode(() => onAdd?.(NodeType.VALUE))}
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
          onSources={onSources}
        />
      );
  }
};

export default ControlsContainer;
