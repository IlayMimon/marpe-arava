import { Button } from "antd";
import SoldierDetailsSection from "./SoldierDetailsSection.tsx";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import { usePatientForm } from "../../hooks/usePatientForm.tsx";

interface Props {
  closeModal: () => void;
}

export default function NewPatientFormContent({ closeModal }: Props) {
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
    handleSubmit,
    handleClear
  } = usePatientForm(closeModal);

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