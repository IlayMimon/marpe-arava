import type { Rule } from "antd/es/form";
import type { DatePickerProps, TimePickerProps } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import type { ReactElement } from "react";

export interface OptionItem {
  value: string;
  label: string;
}

interface CommonProps {
  name: string;
  title: string;
  hint?: string;
  rules?: Rule[];
  forceDisable?: boolean;
}

export interface InputField extends CommonProps {
  type?: "text" | "tel" | "textarea";
  autosize?: boolean | { minRows?: number; maxRows?: number };
}

export interface SelectField extends CommonProps {
  options: OptionItem[] | string[];
  multiSelect?: boolean;
  tagRender?: (props: CustomTagProps) => ReactElement;
}

export interface DateField extends CommonProps {
  type: "date";
  disabledDate?: DatePickerProps["disabledDate"];
}

export interface TimeField extends CommonProps {
  type: "time";
  disabledTimes?: TimePickerProps["disabledTime"];
}

export type EditFieldProps =
  | InputField
  | SelectField
  | DateField
  | TimeField;
