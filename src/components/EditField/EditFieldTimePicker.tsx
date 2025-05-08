import { TimePicker } from "antd";
import dayjs from "dayjs";
import type { TimePickerProps } from "antd";

interface Props {
  value: string;
  onChange: (val: string | string[]) => void;
  hint?: string;
  disabled?: boolean;
  error?: string;
  disabledTimes?: TimePickerProps["disabledTime"];
}

export function EditFieldTimePicker({
  value,
  onChange,
  hint,
  disabled,
  error,
  disabledTimes,
}: Props) {
  const handleChange: TimePickerProps["onChange"] = (_, timeString) => {
    if (typeof onChange === "function") {
      onChange(timeString);
    }
  };

  return (
    <TimePicker
      className="edit-field__input"
      format="HH:mm"
      disabled={disabled}
      placeholder={hint}
      showNow={false}
      needConfirm={false}
      value={value ? dayjs(value, "HH:mm") : null}
      onChange={handleChange}
      popupClassName="edit-field__timepicker-dropdown"
      status={error ? "error" : ""}
      disabledTime={disabledTimes}
    />
  );
}
