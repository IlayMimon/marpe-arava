import {Select, Tooltip} from "antd";
import type {SelectProps} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {OptionItem} from "../../types/EditField.types.ts";

interface Props {
    value: string | string[];
    onChange: (val: string | string[]) => void;
    options: OptionItem[] | string[];
    multiSelect: boolean;
    hint?: string;
    disabled?: boolean;
    error?: string;
}

export function EditFieldSelect({
                                    value,
                                    onChange,
                                    options,
                                    multiSelect,
                                    hint,
                                    disabled,
                                    error,
                                    ...restProps
                                }: Props) {
    const handleChange: SelectProps["onChange"] = (val) => {
        if (val === null) return;
        onChange(val);
    };

    const normalizedOptions: OptionItem[] = options.map(opt =>
        typeof opt === "string" ? {value: opt, label: opt} : opt
    );

    return (
        <Select
            className="edit-field__input"
            mode={multiSelect ? "multiple" : undefined}
            placeholder={hint}
            disabled={disabled}
            value={value ?? null}
            onChange={handleChange}
            options={normalizedOptions}
            showSearch
            allowClear
            status={error ? "error" : ""}
            suffixIcon={
                error ? (
                    <Tooltip title={error}>
                        <span className="edit-field__icon--visible">
                            <ExclamationCircleOutlined/>
                        </span>
                    </Tooltip>
                ) : undefined
            }
            {...restProps}
        />
    );
}
