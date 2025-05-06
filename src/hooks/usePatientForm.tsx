import { useState } from "react";
import dayjs from "dayjs";
import { useForm } from "./useForm";
import { PatientFormData } from "../types/PatientForm.types";

export const usePatientForm = (closeModal?: () => void) => {
  const [isDropOffTouched, setIsDropOffTouched] = useState(false);
  const [isPickupDisabled, setIsPickupDisabled] = useState(false);
  const [isDropOffDisabled, setIsDropOffDisabled] = useState(true);

  const initialForm: PatientFormData = {
    fullName: "",
    phone: "",
    pickupStation: "",
    dropOffStation: "",
    appointmentTypes: [],
    desiredDate: "",
    desiredTime: "",
    notes: "",
  };

  const validationMap = {
    fullName: (value: string) => {
      if (!value || value.trim() === "") return "שדה חובה";
      if (value.length > 20) return "שם המטופל לא יכול להכיל יותר מ-20 תווים";
      return "";
    },
    phone: (value: string) => {
      if (!value || value.trim() === "") return "מספר טלפון הוא שדה חובה";
      let phone = value.trim();
      if (phone.startsWith("+972")) phone = phone.replace("+972", "0");
      if (!/^[0-9]+$/.test(phone)) return "מספר טלפון חייב להכיל ספרות בלבד";
      if (phone.length < 2) return "";
      if (!phone.startsWith("05")) return "מספר טלפון חייב להתחיל בקידומת 05";
      return "";
    },
    pickupStation: (value: string) => {
      if (!isPickupDisabled && (!value || value.trim() === "")) return "שדה חובה";
      return "";
    },
    dropOffStation: (value: string) => {
      if (!isDropOffDisabled && (!value || value.trim() === "")) return "שדה חובה";
      return "";
    },
    desiredDate: (value: string, formData?: PatientFormData) => {
      if (!value || value.trim() === "") return "שדה חובה";
      const selectedDate = dayjs(value, "DD/MM/YYYY");
      const now = dayjs();
      if (!selectedDate.isValid()) return "תאריך לא תקין";
      if (selectedDate.isBefore(now, "day")) return "לא ניתן לבחור תאריך עבר";

      const selectedTime = dayjs(formData?.desiredTime, "HH:mm");
      const isToday = selectedDate.isSame(now, "day");
      if (isToday && selectedTime.isValid() && selectedTime.isBefore(now, "minute")) {
        return "לא ניתן לבחור שעה שכבר עברה";
      }
      return "";
    },
    desiredTime: (value: string, formData?: PatientFormData) => {
      if (!value || value.trim() === "") return "שדה חובה";
      const selectedTime = dayjs(value, "HH:mm");
      const selectedDate = dayjs(formData?.desiredDate, "DD/MM/YYYY");
      const now = dayjs();
      if (!selectedTime.isValid()) return "שעה לא תקינה";
      const isToday = selectedDate.isValid() && selectedDate.isSame(now, "day");
      if (isToday && selectedTime.isBefore(now, "minute")) return "לא ניתן לבחור שעה שכבר עברה";
      return "";
    },
    appointmentTypes: (value: string[]) => {
      if (!Array.isArray(value) || value.length === 0) return "יש לבחור לפחות סוג תור אחד";
      return "";
    },
    notes: (value: string) => {
      if (value && value.length > 300) return "ההערה ארוכה מדי (מקסימום 300 תווים)";
      return "";
    },
  };

  const {
    formData,
    errors,
    isFormValid,
    handleChange,
    validateField,
    handleSubmit: rawSubmit,
    handleClear: rawClear,
    setFormData,
    setErrors,
  } = useForm<PatientFormData>({
    initialForm,
    validationMap,
    onSubmit: (data) => {
      console.log("Submit patient", data);
      if (closeModal) closeModal();
    },
  });

  const handlePickupChange = (val: string | string[]) => {
    const pickupVal = Array.isArray(val) ? val[0] : val;
    const dropVal = isDropOffTouched ? formData.dropOffStation : pickupVal;

    setFormData((prev) => ({
      ...prev,
      pickupStation: pickupVal,
      dropOffStation: dropVal,
    }));

    validateField("pickupStation", pickupVal);
    if (!isDropOffTouched) validateField("dropOffStation", dropVal);
  };

  const handleClear = () => {
    rawClear();
    setIsDropOffDisabled(true);
    setIsPickupDisabled(false);
    setIsDropOffTouched(false);
  };

  return {
    formData,
    errors,
    isFormValid,
    isPickupDisabled,
    isDropOffDisabled,
    isDropOffTouched,
    setIsPickupDisabled,
    setIsDropOffDisabled,
    setIsDropOffTouched,
    handleChange,
    handlePickupChange,
    handleSubmit: rawSubmit,
    handleClear,
    setFormData,
    setErrors,
  };
};
