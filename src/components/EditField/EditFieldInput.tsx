import {Input, Tooltip} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useState} from "react";

const {TextArea} = Input;

interface Props {
    value: string;
    onChange: (val: string) => void;
    type?: React.HTMLInputTypeAttribute;
    hint?: string;
    disabled?: boolean;
    error?: string;
}

export function EditFieldInput({
                                   value,
                                   onChange,
                                   type = "text",
                                   hint,
                                   disabled,
                                   error,
                                   ...restProps
                               }: Props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleIconClick = () => {
        if (error) setTooltipOpen(prev => !prev);
    };

    const inputField = type === "textarea" ? (
        <TextArea
            className="edit-field__textarea"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            placeholder={hint}
            status={error ? "error" : ""}
            {...restProps}
        />
    ) : (
        <Input
            className="edit-field__text"
            type={type}
            placeholder={hint}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            status={error ? "error" : ""}
            {...restProps}
            suffix={
                <Tooltip
                    title={error}
                    open={tooltipOpen && !!error}
                    trigger="hover"
                    onOpenChange={setTooltipOpen}
                >
                    <span
                        className={`edit-field__icon ${error ? "edit-field__icon--visible" : ""}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handleIconClick}
                    >
                        <ExclamationCircleOutlined/>
                    </span>
                </Tooltip>
            }
        />
    );

    return <div className="edit-field__input">{inputField}</div>;
}
