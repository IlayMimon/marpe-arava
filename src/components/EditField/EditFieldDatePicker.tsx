import { ConfigProvider, DatePicker, DatePickerProps } from "antd";
import heIL from "antd/locale/he_IL";
import dayjs from "dayjs";
import "dayjs/locale/he";

interface Props {
  value: string;
  onChange: (val: string | string[]) => void;
  hint?: string;
  disabled?: boolean;
  error?: string;
  disabledDate?: DatePickerProps["disabledDate"];
}

export function EditFieldDatePicker({
  value,
  onChange,
  hint,
  disabled,
  error,
  disabledDate,
}: Props) {
  const handleChange: DatePickerProps["onChange"] = (_, dateString) => {
    if (typeof onChange === "function") {
      onChange(dateString);
    }
  };

  return (
    <ConfigProvider locale={heIL} direction="rtl">
      <DatePicker
        className="edit-field__input"
        format="DD/MM/YYYY"
        disabled={disabled}
        placeholder={hint}
        value={value ? dayjs(value, "DD/MM/YYYY") : null}
        onChange={handleChange}
        showToday={!disabled}
        status={error ? "error" : ""}
        popupClassName="edit-field__datepicker-dropdown"
        disabledDate={disabledDate}
        inputReadOnly
      />
    </ConfigProvider>
  );
}
