import { Input } from "antd";

const { TextArea } = Input;

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
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(e.target.value);
  };

  const inputField =
    type === "textarea" ? (
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
      />
    );

  return <div className="edit-field__input">{inputField}</div>;
}
