import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, message, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import ShuttleAssignmentModal from './ShuttleAssignmentModal/ShuttleAssignmentModal'
// import btnPopUpMsg from "./generic/btnPopUpMsg";


const HomeScreenBody = () => {
  const [isShattlesArranged, setIsShattlesArranged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedic, setSelectedMedic] = useState<string | null>(null);
  const [messagesAlreadySent, setMessagesAlreadySent] = useState(false);


   const handleSubmit = (values: any) => {
    // כאן תוכל לשלוח את הנתונים לשרת
    console.log("Submitting values:", values);
    message.success("שיבוץ הנסיעות בוצע בהצלחה");
    setModalVisible(false);

    // סימולציה: לאחר שליחה נניח שנשלחו הודעות
    setMessagesAlreadySent(true);
  };
  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <Button
          onClick={() => setModalVisible(!modalVisible)}
            color="default"
            variant="filled"
            icon={<IconSparkles />}
            className="home-screen-body__header__left__button"
          >
            שבץ נסיעות
          </Button>
          <ShuttleAssignmentModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        medicName={selectedMedic}
        setMedicName={setSelectedMedic}
        messagesAlreadySent={messagesAlreadySent}
      />
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
          >
            הוספת מטופל
          </Button>
        </div>
      </div>
      <div className="home-screen-body__body">table</div>

    </div>
  );
};

export default HomeScreenBody;
