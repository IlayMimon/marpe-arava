import { useState } from "react";

type ValidationMap<T> = {
  [K in keyof T]?: (value: T[K], formData?: T) => string;
};

export function useForm<T extends Record<string, any>>(params: {
  initialForm: T;
  validationMap?: ValidationMap<T>;
  onSubmit?: (formData: T) => void;
}) {
  const { initialForm, validationMap = {}, onSubmit } = params;

  const [formData, setFormData] = useState<T>(initialForm);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    createEmptyErrors(initialForm)
  );

  function createEmptyErrors(form: T): Record<keyof T, string> {
    const result = {} as Record<keyof T, string>;
    (Object.keys(form) as (keyof T)[]).forEach((key) => {
      result[key] = "";
    });
    return result;
  }

  const validateField = <K extends keyof T>(key: K, value: T[K]) => {
    const validator = (validationMap as ValidationMap<T>)[key];
    const error = validator ? validator(value, formData) : "";
    setErrors((prev) => ({ ...prev, [key]: error }));
    return error;
  };

  const handleChange = (key: keyof T) => (val: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [key]: val };
      validateField(key, val);
      return updated;
    });
  };

  const isFormValid = Object.values(errors).every((e) => e === "");

  const handleSubmit = () => {
    if (!isFormValid) return;
    if (onSubmit) onSubmit(formData);
  };

  const handleClear = () => {
    setFormData(initialForm);
    setErrors(createEmptyErrors(initialForm));
  };

  return {
    formData,
    errors,
    isFormValid,
    handleChange,
    validateField,
    handleSubmit,
    handleClear,
    setFormData,
    setErrors,
  };
}
