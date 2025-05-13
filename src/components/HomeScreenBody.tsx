import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import ShuttleAssignmentModal from "./ShuttleAssignmentModal/ShuttleAssignmentModal";
import BtnPopUpMsg from "./generic/btnPopUpMsg";
import NewPatientFormContent from "./NewPatientForm/NewPatientFormContent";
import { PatientFormData } from "../types/PatientForm.types";
import { FormValues } from "./types/shuttleAssignmentProps";
import ShuttleTableHeader from "./ShuttleTable/ShuttleTableHeader";

export type TripDirection = 'outbound' | 'return';

const HomeScreenBody = () => {
  const [isShuttlesArranged, setIsShuttlesArranged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePatientSubmit = (formData: PatientFormData) => {
    console.log("נתוני הטופס:", formData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedic, setSelectedMedic] = useState<string | null>(null);
  const [messagesAlreadySent, setMessagesAlreadySent] = useState(false);
  const [popUpMsgOpen, setPopUpMsgOpen] = useState(false);
  const [tripDirection, setTripDirection] = useState<TripDirection>('outbound');

  const handleChangeDirection = (direction: TripDirection) => {
    setTripDirection(direction)
  }

  const handleSubmit = () => {
    setIsShuttlesArranged(true);
    setModalVisible(false);
  };

  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <BtnPopUpMsg
            title="שיבוץ נסיעות מחדש?"
            msg="שים לב, פעולה זו תאפס את השיבוצים הקיימים."
            btnContent="שבץ מחדש"
            isOpen={popUpMsgOpen}
            onConfirm={() => {
              setModalVisible((prevValue) => !prevValue);
              setPopUpMsgOpen(false);
            }}
            onCancel={() => setPopUpMsgOpen(false)}
          >
            <Tooltip
              key="submit"
              title={
                messagesAlreadySent ? "לא ניתן לשבץ מחדש לאחר הפצת הודעות" : ""
              }
            >
              <Button
                onClick={() =>
                  isShuttlesArranged
                    ? setPopUpMsgOpen(true)
                    : setModalVisible(true)
                }
                disabled={messagesAlreadySent}
                color="default"
                variant="filled"
                icon={<IconSparkles />}
                className="home-screen-body__header__left__button"
              >
                שבץ נסיעות
              </Button>
            </Tooltip>
          </BtnPopUpMsg>
          <ShuttleAssignmentModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onSubmit={handleSubmit}
            medicName={selectedMedic}
            setMedicName={setSelectedMedic}
            messagesAlreadySent={messagesAlreadySent}
          />
          <Tooltip title={isShuttlesArranged ? "" : "נדרש לשבץ נסיעות"}>
            <Button
              disabled={!isShuttlesArranged}
              color="default"
              variant="filled"
              icon={<IconSend />}
              className="home-screen-body__header__left__button"
              onClick={() => {
                setMessagesAlreadySent(true);
                setPopUpMsgOpen(false);
              }
              }
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
      <div className="home-screen-body__body">
        <ShuttleTableHeader handleChange={handleChangeDirection} tripDirection={tripDirection}/>
        {tripDirection === "outbound" ? 
          <div>going</div> : 
          <div>returning</div>
        }
      </div>
    </div>
  );
};

export default HomeScreenBody;
