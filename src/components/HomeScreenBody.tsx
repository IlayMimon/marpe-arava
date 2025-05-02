import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import NewPatientFormContent from "./NewPatientForm/NewPatientFormContent";
import { PatientFormData } from "../types/PatientForm.types";

const HomeScreenBody = () => {
  const [isShattlesArranged, setIsShattlesArranged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePatientSubmit = (formData: PatientFormData) => {
    console.log("נתוני הטופס:", formData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <Button
            color="default"
            variant="filled"
            icon={<IconSparkles />}
            className="home-screen-body__header__left__button"
          >
            שבץ נסיעות
          </Button>
          <Tooltip title={isShattlesArranged ? undefined : "נדרש לשבץ נסיעות"}>
            <Button
              disabled
              color="default"
              variant="filled"
              icon={<IconSend />}
              className="home-screen-body__header__left__button"
            >
              שליחת הודעות
            </Button>
          </Tooltip>
          <Button
            color="default"
            variant="solid"
            icon={<TbPlus />}
            className="home-screen-body__header__left__button"
            onClick={() => setIsModalOpen(true)}
          >
            הוספת מטופל
          </Button>
        </div>
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
      </div>
      <div className="home-screen-body__body">table</div>
    </div>
  );
};

export default HomeScreenBody;
