import { Form } from "antd";
import { usePatientForm } from "../../hooks/usePatientForm.tsx";
import { PatientFormData } from "../../types/PatientForm.types.ts";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import PatientDetailsSection from "./PatientDetailsSection.tsx";
import FormFooter from "./FormFooter.tsx";

interface Props {
  closeModal: () => void;
  onSubmit: (formData: PatientFormData) => void;
}

export default function NewPatientFormContent({ closeModal, onSubmit }: Props) {
  const formHook = usePatientForm(closeModal, onSubmit);

  return (
    <Form form={formHook.form} onFinish={formHook.handleSubmit} layout="vertical">
      <div className="patient-form">
        <p className="patient-form__title">הוספת מטופל ידנית</p>

        <PatientDetailsSection {...formHook} />
        <AppointmentDetailsSection {...formHook} />
        <FormFooter {...formHook} />
      </div>
    </Form>
  );
}
