import type { TimePickerProps, DatePickerProps } from "antd";
import { Rule } from "antd/es/form";
import {CustomTagProps} from "rc-select/lib/BaseSelect";

export interface OptionItem {
    value: string;
    label: string;
}

interface CommonProps {
    title: string;
    hint?: string;
    rules?: Rule[];
    showCheckbox?: boolean;
    defaultCheck?: boolean;
    forceDisable?: boolean;
    onToggleEnable?: (enabled: boolean) => void;
    onTextChange: (value: string | string[]) => void;
    onTextBlur?: (value: string | string[]) => void;
    error?: string;
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
    name?: string;
}

interface SelectFieldMulti extends CommonProps {
    options: OptionItem[] | string[];
    multiSelect: true;
    value: string[];
    type?: never;
    tagRender?: (props: CustomTagProps, index: number, all: string[]) => React.ReactNode;
}

interface SelectFieldSingle extends CommonProps {
    options: OptionItem[] | string[];
    multiSelect?: false | undefined;
    value: string;
    type?: never;
}

interface InputField extends CommonProps {
    type?: Exclude<React.HTMLInputTypeAttribute, "time" | "date">;
    value: string;
    maxLength?: number | undefined;
    autosize?: boolean | { minRows?: number; maxRows?: number };
}

interface TimePickerField extends CommonProps {
    type: "time";
    value: string;
    disabledTimes?: TimePickerProps["disabledTime"];
}

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
