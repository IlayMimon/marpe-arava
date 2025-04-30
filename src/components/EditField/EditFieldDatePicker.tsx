import { ConfigProvider, DatePicker, DatePickerProps, Tooltip } from "antd";
import heIL from "antd/locale/he_IL";
import dayjs from "dayjs";
import "dayjs/locale/he";
import { ExclamationCircleOutlined, CalendarOutlined } from "@ant-design/icons";

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

  const suffixIcon = error ? (
    <Tooltip title={error}>
      <ExclamationCircleOutlined className={"edit-field__date-icon"} />
    </Tooltip>
  ) : (
    <CalendarOutlined />
  );

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
        suffixIcon={suffixIcon}
        disabledDate={disabledDate}
        inputReadOnly
      />
    </ConfigProvider>
  );
}
