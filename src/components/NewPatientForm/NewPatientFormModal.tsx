import {Button, Modal} from "antd";
import NewPatientFormContent from "./NewPatientFormContent.tsx";
import {useState} from "react";

export default function NewPatientFormModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                <NewPatientFormContent closeModal={() => setIsModalOpen(false)}/>
            </Modal>
        </>
    );
}
