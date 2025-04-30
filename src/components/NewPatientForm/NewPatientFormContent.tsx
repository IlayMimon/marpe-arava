import { useState } from "react";
import { Button } from "antd";
import SoldierDetailsSection from "./SoldierDetailsSection.tsx";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import dayjs from "dayjs";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";

interface Props {
  closeModal: () => void;
}

export default function NewPatientFormContent({ closeModal }: Props) {
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

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phone: "",
    pickupStation: "",
    dropOffStation: "",
    appointmentTypes: "",
    desiredDate: "",
    desiredTime: "",
    notes: "",
  });

  const [isDropOffTouched, setIsDropOffTouched] = useState(false);
  const [isPickupDisabled, setIsPickupDisabled] = useState(false);
  const [isDropOffDisabled, setIsDropOffDisabled] = useState(true);

  const validateFullName = (value: string | undefined): string => {
    if (!value || value.trim() === "") {
      return "שדה חובה";
    }
    if (value.length > 20) {
      return "שם המטופל לא יכול להכיל יותר מ-20 תווים";
    }
    return "";
  };
  
  const validatePhone = (value: string | undefined): string => {
    if (!value || value.trim() === "") {
      return "מספר טלפון הוא שדה חובה";
    }
  
    let phone = value.trim();
  
    if (phone.startsWith("+972")) {
      phone = phone.replace("+972", "0");
      setFormData((prev) => ({ ...prev, phone }));
    }
  
    if (!phone.startsWith("05")) {
      return "מספר טלפון חייב להתחיל בקידומת 05";
    }
    if (!/^[0-9]+$/.test(phone)) {
      return "מספר טלפון חייב להכיל ספרות בלבד";
    }
    if (phone.length !== 10) {
      return "מספר טלפון חייב להכיל בדיוק 10 ספרות";
    }
    return "";
  };
  
  const validatePickupStation = (value: string | undefined): string => {
    if (!isPickupDisabled && (!value || value.trim() === "")) {
      return "שדה חובה";
    }
    return "";
  };
  
  const validateDropOffStation = (value: string | undefined): string => {
    if (!isDropOffDisabled && (!value || value.trim() === "")) {
      return "שדה חובה";
    }
    return "";
  };
  
  const validateDesiredDate = (value: string | undefined): string => {
    if (!value || value.trim() === "") {
      return "שדה חובה";
    }
  
    const selectedDate = dayjs(value, "DD/MM/YYYY");
    const now = dayjs();
  
    if (!selectedDate.isValid()) {
      return "תאריך לא תקין";
    }
    if (selectedDate.isBefore(now, "day")) {
      return "לא ניתן לבחור תאריך עבר";
    }
  
    const selectedTime = dayjs(formData.desiredTime, "HH:mm");
    const isToday = selectedDate.isSame(now, "day");
    const isTimePast = selectedTime.isValid() && selectedTime.isBefore(now, "minute");
  
    if (isToday && isTimePast) {
      setErrors((prev) => ({
        ...prev,
        desiredTime: "לא ניתן לבחור שעה שכבר עברה",
      }));
    } else {
      setErrors((prev) => ({ ...prev, desiredTime: "" }));
    }
  
    return "";
  };
  
  const validateDesiredTime = (value: string | undefined): string => {
    if (!value || value.trim() === "") {
      return "שדה חובה";
    }
  
    const selectedTime = dayjs(value, "HH:mm");
    const selectedDate = dayjs(formData.desiredDate, "DD/MM/YYYY");
    const now = dayjs();
  
    if (!selectedTime.isValid()) {
      return "שעה לא תקינה";
    }
  
    const isToday = selectedDate.isValid() && selectedDate.isSame(now, "day");
    const isTimePast = selectedTime.isBefore(now, "minute");
  
    if (isToday && isTimePast) {
      return "לא ניתן לבחור שעה שכבר עברה";
    }
  
    return "";
  };
  
  const validateAppointmentTypes = (value: string[] | undefined): string => {
    if (!Array.isArray(value) || value.length === 0) {
      return "יש לבחור לפחות סוג תור אחד";
    }
    return "";
  };
  
  const validateNotes = (value: string | undefined): string => {
    if (value && value.length > 300) {
      return "ההערה ארוכה מדי (מקסימום 300 תווים)";
    }
    return "";
  };
  
  const validationMap: {
    [K in keyof PatientFormData]?: (value: PatientFormData[K]) => string;
  } = {
    fullName: validateFullName,
    phone: validatePhone,
    pickupStation: validatePickupStation,
    dropOffStation: validateDropOffStation,
    desiredDate: validateDesiredDate,
    desiredTime: validateDesiredTime,
    appointmentTypes: validateAppointmentTypes,
    notes: validateNotes,
  };
  

  const validateField = <K extends keyof PatientFormData>(
  key: K,
  value: PatientFormData[K]
) => {
  const validator = validationMap[key];
  const error = validator ? validator(value) : "";
  setErrors((prev) => ({ ...prev, [key]: error }));
};

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    formData.fullName.trim() !== "" &&
    /^05\d{8}$/.test(formData.phone) &&
    (!isPickupDisabled ? formData.pickupStation.trim() !== "" : true) &&
    (!isDropOffDisabled ? formData.dropOffStation.trim() !== "" : true) &&
    formData.appointmentTypes.length > 0 &&
    formData.desiredDate.trim() !== "" &&
    formData.desiredTime.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log("Submit patient", formData);
    closeModal();
  };

  const handleClear = () => {
    setFormData(initialForm);
    setErrors({
      fullName: "",
      phone: "",
      pickupStation: "",
      dropOffStation: "",
      appointmentTypes: "",
      desiredDate: "",
      desiredTime: "",
      notes: "",
    });
    setIsDropOffDisabled(true);
    setIsPickupDisabled(false);
    setIsDropOffTouched(false);
  };

  const handleChange =
    (key: keyof PatientFormData) => (val: string | string[]) => {
      setFormData((prev) => ({ ...prev, [key]: val }));
      validateField(key, val);
    };

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
      

  return (
    <div className="patient-form">
      <p className="patient-form__title">הוספת מטופל ידנית</p>

      <SoldierDetailsSection
        formData={formData}
        onChange={handleChange}
        onPickupChange={handlePickupChange}
        isPickupDisabled={isPickupDisabled}
        isDropoffDisabled={isDropOffDisabled}
        setIsPickupDisabled={setIsPickupDisabled}
        setIsDropoffDisabled={setIsDropOffDisabled}
        setIsDropoffTouched={setIsDropOffTouched}
        errors={errors}
      />

      <AppointmentDetailsSection
        formData={formData}
        onChange={handleChange}
        isPickupDisabled={isPickupDisabled}
        errors={errors}
      />

      <div className="patient-form__footer">
        <Button key="clear" onClick={handleClear}>
          נקה טופס
        </Button>
        <Button
          color="default"
          variant="solid"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          הוסף מטופל
        </Button>
      </div>
    </div>
  );
}
