import { Button } from "antd";
import SoldierDetailsSection from "./SoldierDetailsSection.tsx";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import { usePatientForm } from "../../hooks/usePatientForm.tsx";
import { PatientFormData } from "../../types/PatientForm.types.ts";

interface Props {
  closeModal: () => void;
  onSubmit: (formData: PatientFormData) => void; // הוסף את onSubmit כ- prop
}

export default function NewPatientFormContent({ closeModal, onSubmit }: Props) {
  const {
    formData,
    errors,
    isFormValid,
    isPickupDisabled,
    isDropOffDisabled,
    setIsPickupDisabled,
    setIsDropOffDisabled,
    setIsDropOffTouched,
    handleChange,
    handlePickupChange,
    handleClear
  } = usePatientForm();

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(formData); 
      closeModal();
    }
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
