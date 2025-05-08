import { useState } from "react";
import dayjs from "dayjs";
import { PatientFormData } from "../types/PatientForm.types";
import { Rule } from "antd/es/form";
import { Form } from "antd";

export interface FormErrors {
  fullName: string;
  phone: string;
  pickupStation: string;
  dropOffStation: string;
  appointmentTypes: string;
  desiredDate: string;
  desiredTime: string;
  notes: string;
}

const defaultFormErrors: FormErrors = {
  fullName: "",
  phone: "",
  pickupStation: "",
  dropOffStation: "",
  appointmentTypes: "",
  desiredDate: "",
  desiredTime: "",
  notes: "",
};

export const usePatientForm = (
  closeModal?: () => void,
  onSubmitCallback?: (formData: PatientFormData) => void
) => {
  const [form] = Form.useForm<PatientFormData>();

  const [formErrors, setFormErrors] = useState<FormErrors>(defaultFormErrors);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const [isDropOffTouched, setIsDropOffTouched] = useState(false);
  const [isPickupDisabled, setIsPickupDisabled] = useState(false);
  const [isDropOffDisabled, setIsDropOffDisabled] = useState(true);

  const validationMap: { [K in keyof PatientFormData]: Rule[] } = {
    fullName: [
      { required: true, message: "שדה חובה", validateTrigger: "onChange" },
      { max: 20, message: "שם המטופל לא יכול להכיל יותר מ-20 תווים", validateTrigger: "onChange" },
    ],
    phone: [
      { required: true, message: "מספר טלפון הוא שדה חובה", validateTrigger: "onChange" },
      { pattern: /^\d+$/, message: "מספר טלפון יכול להכיל ספרות בלבד", validateTrigger: "onChange" },
      {
        validator: () => {
          const phone = form.getFieldValue("phone");
          if (!phone || phone.startsWith("05")) return Promise.resolve();
          return Promise.reject("מספר טלפון חייב להתחיל ב-05");
        },
        validateTrigger: "onChange"
      },
      {
        validator: () => {
          const phone = form.getFieldValue("phone");
          if (!phone || phone.length === 10) return Promise.resolve();
          return Promise.reject("מספר טלפון חייב להיות באורך של 10 ספרות");
        },
        validateTrigger: "onChange"
      }
    ],
    pickupStation: [
      { required: !isPickupDisabled, message: "שדה חובה", validateTrigger: "onChange" },
    ],
    dropOffStation: [
      { required: !isDropOffDisabled, message: "שדה חובה", validateTrigger: "onChange" },
    ],
    desiredDate: [
      { required: true, message: "שדה חובה", validateTrigger: "onChange" },
      {
        validator: (_, value) => {
          const selectedDate = dayjs(value, "DD/MM/YYYY");
          const now = dayjs();
          if (!selectedDate.isValid()) return Promise.reject("תאריך לא תקין");
          if (selectedDate.isBefore(now, "day")) return Promise.reject("לא ניתן לבחור תאריך עבר");
          return Promise.resolve();
        },
        validateTrigger: "onChange"
      },
    ],
    desiredTime: [
      { required: true, message: "שדה חובה", validateTrigger: "onChange" },
      {
        validator: () => {
          const time = form.getFieldValue("desiredTime");
          const date = form.getFieldValue("desiredDate");
          const selectedTime = dayjs(time, "HH:mm");
          const selectedDate = dayjs(date, "DD/MM/YYYY");
          const now = dayjs();
          if (!selectedTime.isValid()) return Promise.reject("שעה לא תקינה");
          if (selectedDate.isSame(now, "day") && selectedTime.isBefore(now, "minute")) {
            return Promise.reject("לא ניתן לבחור שעה שכבר עברה");
          }
          return Promise.resolve();
        },
        validateTrigger: "onChange"
      },
    ],
    appointmentTypes: [
      { required: true, message: "יש לבחור לפחות סוג תור אחד", validateTrigger: "onChange" },
    ],
    notes: [
      { max: 300, message: "ההערה ארוכה מדי (מקסימום 300 תווים)", validateTrigger: "onChange" },
    ],
  };
  

  const updateFormErrors = () => {
    const errors = form.getFieldsError();
    const values = form.getFieldsValue();
    const newErrors: FormErrors = { ...defaultFormErrors };
  
    errors.forEach(({ name, errors }) => {
      if (errors.length > 0) {
        const key = Array.isArray(name) ? name[0] : name;
        if (key in newErrors) {
          newErrors[key as keyof FormErrors] = errors.join(", ");
        }
      }
    });
  
    setFormErrors(newErrors);
  
    // בדיקת שדות חובה מול ערכים
    const requiredFields: (keyof PatientFormData)[] = [
      "fullName",
      "phone",
      "pickupStation",
      "dropOffStation",
      "desiredDate",
      "desiredTime",
      "appointmentTypes"
    ];
  
    const allRequiredFilled = requiredFields.every((field) => {
      const value = values[field];
      return Array.isArray(value)
        ? value.length > 0
        : value !== undefined && value !== null && value !== "";
    });
  
    const noFieldErrors = errors.every((e) => e.errors.length === 0);
  
    setIsFormValid(allRequiredFilled && noFieldErrors);
  };
  

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        const values = form.getFieldsValue();
        onSubmitCallback?.(values);
        closeModal?.();
      })
      .catch(() => {
        updateFormErrors();
      });
  };

  const handleClearAll = () => {
    form.resetFields();
    setIsDropOffDisabled(true);
    setIsPickupDisabled(false);
    setIsDropOffTouched(false);
    setFormErrors(defaultFormErrors);
    setIsFormValid(false); // ← תוקן
  };

  const handleChange =
    (key: keyof PatientFormData) => (val: string | string[]) => {
      form.setFieldValue(key, val);
    };

  const handlePickupChange = (val: string | string[]) => {
    const pickupVal = Array.isArray(val) ? val[0] : val;
    const dropVal = isDropOffTouched
      ? form.getFieldValue("dropOffStation")
      : pickupVal;

    form.setFieldsValue({
      pickupStation: pickupVal,
      dropOffStation: dropVal,
    });
  };

  return {
    form,
    formErrors,
    isFormValid,
    isPickupDisabled,
    isDropOffDisabled,
    isDropOffTouched,
    setIsPickupDisabled,
    setIsDropOffDisabled,
    setIsDropOffTouched,
    handleChange,
    handlePickupChange,
    handleSubmit,
    handleClearAll,
    updateFormErrors,
    validationMap,
  };
};
