import type { TimePickerProps, DatePickerProps } from "antd";
import {CustomTagProps} from "rc-select/lib/BaseSelect";

export interface OptionItem {
    value: string;
    label: string;
}

interface CommonProps {
    title: string;
    hint?: string;
    showCheckbox?: boolean;
    defaultCheck?: boolean;
    forceDisable?: boolean;
    onToggleEnable?: (enabled: boolean) => void;
    onTextChange: (value: string | string[]) => void;
    onTextBlur?: (value: string | string[]) => void;
    error?: string;
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
    autoSize?: boolean | { minRows?: number; maxRows?: number };
}

/** Select Field – Multi-select */
interface SelectFieldMulti extends CommonProps {
    options: OptionItem[] | string[];
    multiSelect: true;
    value: string[];
    type?: never;
    tagRender?: (props: CustomTagProps, index: number, all: string[]) => React.ReactNode;
}

/** Select Field – Single-select */
interface SelectFieldSingle extends CommonProps {
    options: OptionItem[] | string[];
    multiSelect?: false | undefined;
    value: string;
    type?: never;
}

/** Input field (text, email, number, etc.) */
interface InputField extends CommonProps {
    type?: Exclude<React.HTMLInputTypeAttribute, "time" | "date">;
    value: string;
    maxLength?: number | undefined;
}

/** Time picker field */
interface TimePickerField extends CommonProps {
    type: "time";
    value: string;
    disabledTimes?: TimePickerProps["disabledTime"];
}

/** ✅ Date picker field */
interface DatePickerField extends CommonProps {
    type: "date";
    value: string;
    disabledDate?: DatePickerProps["disabledDate"];
}

export type EditFieldProps =
    | SelectFieldMulti
    | SelectFieldSingle
    | InputField
    | TimePickerField
    | DatePickerField;
