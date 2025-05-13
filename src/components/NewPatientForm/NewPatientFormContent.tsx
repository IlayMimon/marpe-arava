import { Button, Form } from "antd";
import SoldierDetailsSection from "./SoldierDetailsSection.tsx";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import { usePatientForm } from "../../hooks/usePatientForm.tsx";
import { PatientFormData } from "../../types/PatientForm.types.ts";

interface Props {
  closeModal: () => void;
  onSubmit: (formData: PatientFormData) => void;
}

export default function NewPatientFormContent({ closeModal, onSubmit }: Props) {
  const {
    form,
    formErrors,
    isFormValid,
    isPickupDisabled,
    isDropOffDisabled,
    setIsPickupDisabled,
    setIsDropOffDisabled,
    setIsDropOffTouched,
    handleChange,
    handlePickupChange,
    handleSubmit,
    handleClearAll,
    updateFormErrors,
    validationMap,
  } = usePatientForm(closeModal, onSubmit);

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      onFieldsChange={updateFormErrors}
    >
      <div className="patient-form">
        <p className="patient-form__title">הוספת מטופל ידנית</p>

        <SoldierDetailsSection
          formData={form}
          onChange={handleChange}
          onPickupChange={handlePickupChange}
          isPickupDisabled={isPickupDisabled}
          isDropoffDisabled={isDropOffDisabled}
          setIsPickupDisabled={setIsPickupDisabled}
          setIsDropoffDisabled={setIsDropOffDisabled}
          setIsDropoffTouched={setIsDropOffTouched}
          errors={formErrors}
          validationMap={validationMap}
        />

        <AppointmentDetailsSection
          formData={form}
          onChange={handleChange}
          isPickupDisabled={isPickupDisabled}
          validationMap={validationMap}
          errors={formErrors}
        />
        <div className="patient-form__footer">
          <Button onClick={handleClearAll}>נקה טופס</Button>
          <Button type="primary" htmlType="submit" disabled={!isFormValid}>
            הוסף מטופל
          </Button>
        </div>
      </div>
    </Form>
  );
}
