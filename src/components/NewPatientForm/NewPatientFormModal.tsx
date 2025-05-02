import { Button, Modal } from "antd";
import NewPatientFormContent from "./NewPatientFormContent.tsx";
import { useState } from "react";
import { PatientFormData } from "../../types/PatientForm.types.ts";

export default function NewPatientFormModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePatientSubmit = (formData: PatientFormData) => {
    console.log("נתוני הטופס:", formData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        פתח מודאל
      </Button>
      <Modal
        className="patient-form-modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <NewPatientFormContent
          closeModal={closeModal}
          onSubmit={handlePatientSubmit}
        />
      </Modal>
    </>
  );
}
