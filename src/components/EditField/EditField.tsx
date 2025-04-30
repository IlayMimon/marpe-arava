import { useState } from "react";
import { Checkbox } from "antd";
import { EditFieldInput } from "./EditFieldInput.tsx";
import { EditFieldSelect } from "./EditFieldSelect.tsx";
import { EditFieldTimePicker } from "./EditFieldTimePicker.tsx";
import { EditFieldDatePicker } from "./EditFieldDatePicker.tsx";
import { EditFieldProps, OptionItem } from "../../types/EditField.types.ts";

export default function EditField(props: EditFieldProps) {
  const {
    title,
    type = "text",
    hint = "",
    showCheckbox = false,
    forceDisable,
    defaultCheck = false,
    checked,
    onCheckChange,
    value,
    onToggleEnable,
    onTextChange,
    error,
    ...restProps
  } = props;

  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(!defaultCheck);

  const currentChecked = isControlled ? checked : internalChecked;

  let normalizedOptions: OptionItem[] | undefined;
  if ("options" in props) {
    const rawOptions = props.options;
    normalizedOptions = Array.isArray(rawOptions)
      ? rawOptions.map(
          (opt): OptionItem =>
            typeof opt === "string" ? { value: opt, label: opt } : opt
        )
      : undefined;
  }

  const multiSelect: boolean =
    "multiSelect" in props ? props.multiSelect === true : false;

  const handleToggle = () => {
    const newState = !currentChecked;
    if (!isControlled) setInternalChecked(newState);
    if (onCheckChange) onCheckChange(newState);
    if (onToggleEnable) onToggleEnable(!newState);
  };

  const isDisabled = forceDisable ?? (showCheckbox ? !currentChecked : false);

  return (
    <div className="edit-field">
      <div className="edit-field__top">
        <p className="edit-field__title">{title}</p>
        {showCheckbox && (
          <Checkbox
            className="edit-field__checkbox"
            checked={currentChecked}
            onChange={handleToggle}
          />
        )}
      </div>

      <div className="edit-field__body">
        {normalizedOptions ? (
          <EditFieldSelect
            value={value}
            onChange={onTextChange}
            options={normalizedOptions}
            multiSelect={multiSelect}
            hint={hint}
            disabled={isDisabled}
            error={error}
            {...restProps}
          />
        ) : type === "time" ? (
          <EditFieldTimePicker
            value={value as string}
            onChange={onTextChange}
            hint={hint}
            disabled={isDisabled}
            error={error}
            {...restProps}
          />
        ) : type === "date" ? (
          <EditFieldDatePicker
            value={value as string}
            onChange={onTextChange}
            hint={hint}
            disabled={isDisabled}
            error={error}
            {...restProps}
          />
        ) : (
          <EditFieldInput
            value={value as string}
            onChange={onTextChange}
            type={type}
            hint={hint}
            disabled={isDisabled}
            error={error}
            {...restProps}
          />
        )}
      </div>
    </div>
  );
}
